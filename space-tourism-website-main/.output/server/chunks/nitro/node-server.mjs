globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { createStorage } from 'unstorage';
import { withQuery, withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      return event.req.originalUrl || event.req.url;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(_error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(_error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    description: "",
    data: _error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (errorObject.statusCode !== 404) {
    console.error("[nuxt] [request error]", errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const url = withQuery("/__nuxt_error", errorObject);
  const html = await $fetch(url).catch((error) => {
    console.error("[nitro] Error while generating error response", error);
    return errorObject.statusMessage;
  });
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/_nuxt/_id_-541e3b12.mjs": {
    "type": "application/javascript",
    "etag": "\"6e9-B98x70bpJNJ/2w8juXJOOgMzHWY\"",
    "mtime": "2022-06-08T15:51:12.719Z",
    "path": "../public/_nuxt/_id_-541e3b12.mjs"
  },
  "/_nuxt/_id_-6cf24105.mjs": {
    "type": "application/javascript",
    "etag": "\"7a3-7rjZT7nAwD0aJoOw8YrL2wtSKEs\"",
    "mtime": "2022-06-08T15:51:12.718Z",
    "path": "../public/_nuxt/_id_-6cf24105.mjs"
  },
  "/_nuxt/_id_-7bbc005c.mjs": {
    "type": "application/javascript",
    "etag": "\"6be-1IguiWaxvqwb4D6CdZNYXuT2+eI\"",
    "mtime": "2022-06-08T15:51:12.717Z",
    "path": "../public/_nuxt/_id_-7bbc005c.mjs"
  },
  "/_nuxt/background-crew-desktop.b41ac858.jpg": {
    "type": "image/jpeg",
    "etag": "\"9bb1-NAmYKgkVSLqYGWNq9TewdUV9B68\"",
    "mtime": "2022-06-08T15:51:12.716Z",
    "path": "../public/_nuxt/background-crew-desktop.b41ac858.jpg"
  },
  "/_nuxt/background-crew-mobile.a393984a.jpg": {
    "type": "image/jpeg",
    "etag": "\"22e6-+pM7Lp4xpM4tPJHLDtXTt8hN8v4\"",
    "mtime": "2022-06-08T15:51:12.715Z",
    "path": "../public/_nuxt/background-crew-mobile.a393984a.jpg"
  },
  "/_nuxt/background-crew-tablet.335a7465.jpg": {
    "type": "image/jpeg",
    "etag": "\"5f7c-oXyXFeOjtNn0Dtqtch6HsePy35A\"",
    "mtime": "2022-06-08T15:51:12.714Z",
    "path": "../public/_nuxt/background-crew-tablet.335a7465.jpg"
  },
  "/_nuxt/background-destination-desktop.47c4fc03.jpg": {
    "type": "image/jpeg",
    "etag": "\"11bae-HQpRlo31i6awEzQ/wQBgO6d7Mmc\"",
    "mtime": "2022-06-08T15:51:12.713Z",
    "path": "../public/_nuxt/background-destination-desktop.47c4fc03.jpg"
  },
  "/_nuxt/background-destination-mobile.59a7e1d7.jpg": {
    "type": "image/jpeg",
    "etag": "\"349b-Oui3j7klyM8QUOYq/ULAQD+B8Yw\"",
    "mtime": "2022-06-08T15:51:12.713Z",
    "path": "../public/_nuxt/background-destination-mobile.59a7e1d7.jpg"
  },
  "/_nuxt/background-destination-tablet.346382a8.jpg": {
    "type": "image/jpeg",
    "etag": "\"9600-PfHo8u7VieOl0NNigvLOeNXWx4g\"",
    "mtime": "2022-06-08T15:51:12.712Z",
    "path": "../public/_nuxt/background-destination-tablet.346382a8.jpg"
  },
  "/_nuxt/background-home-desktop.c0071b13.jpg": {
    "type": "image/jpeg",
    "etag": "\"11f4d-3i+/lqke5P1r+LwvY9mhPUzmPVg\"",
    "mtime": "2022-06-08T15:51:12.712Z",
    "path": "../public/_nuxt/background-home-desktop.c0071b13.jpg"
  },
  "/_nuxt/background-home-mobile.ffd09c17.jpg": {
    "type": "image/jpeg",
    "etag": "\"48a9-ubJV2a66ssGz5lcS9Rzq+tnvGcI\"",
    "mtime": "2022-06-08T15:51:12.711Z",
    "path": "../public/_nuxt/background-home-mobile.ffd09c17.jpg"
  },
  "/_nuxt/background-home-tablet.5de14385.jpg": {
    "type": "image/jpeg",
    "etag": "\"cdca-59f+rRG5M1IRbIv0oSpK0FhbZJs\"",
    "mtime": "2022-06-08T15:51:12.711Z",
    "path": "../public/_nuxt/background-home-tablet.5de14385.jpg"
  },
  "/_nuxt/background-technology-desktop.457659c3.jpg": {
    "type": "image/jpeg",
    "etag": "\"8649-LA7LSq15ks/RW57d3q1q2RGb72Q\"",
    "mtime": "2022-06-08T15:51:12.710Z",
    "path": "../public/_nuxt/background-technology-desktop.457659c3.jpg"
  },
  "/_nuxt/background-technology-mobile.b1fdb61f.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b41-V9Zqzjulp7mFOFo5FdgyVoj1Y9U\"",
    "mtime": "2022-06-08T15:51:12.710Z",
    "path": "../public/_nuxt/background-technology-mobile.b1fdb61f.jpg"
  },
  "/_nuxt/background-technology-tablet.cbc2b315.jpg": {
    "type": "image/jpeg",
    "etag": "\"4414-IEynOoMsP85IZwL739W/kdfTFkA\"",
    "mtime": "2022-06-08T15:51:12.709Z",
    "path": "../public/_nuxt/background-technology-tablet.cbc2b315.jpg"
  },
  "/_nuxt/entry-1898479d.mjs": {
    "type": "application/javascript",
    "etag": "\"2038a-jtuk+wqzTiMc2v/vibhXr27oIJY\"",
    "mtime": "2022-06-08T15:51:12.709Z",
    "path": "../public/_nuxt/entry-1898479d.mjs"
  },
  "/_nuxt/entry.2a0410d0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5238-XSElEOo7l9MnbAVanb7zpUOnKPg\"",
    "mtime": "2022-06-08T15:51:12.708Z",
    "path": "../public/_nuxt/entry.2a0410d0.css"
  },
  "/_nuxt/icon-close.829c583a.svg": {
    "type": "image/svg+xml",
    "etag": "\"e3-N9drR+LFm4OkmBm/aKiR600yrpk\"",
    "mtime": "2022-06-08T15:51:12.707Z",
    "path": "../public/_nuxt/icon-close.829c583a.svg"
  },
  "/_nuxt/icon-hamburger.a9c92f26.svg": {
    "type": "image/svg+xml",
    "etag": "\"a0-qwwM/1EenoCIhdsivCrjkBT51CI\"",
    "mtime": "2022-06-08T15:51:12.707Z",
    "path": "../public/_nuxt/icon-hamburger.a9c92f26.svg"
  },
  "/_nuxt/index-a875bf46.mjs": {
    "type": "application/javascript",
    "etag": "\"176-tunQ4hF9Z7oo8m7X5IHV96f5IbA\"",
    "mtime": "2022-06-08T15:51:12.706Z",
    "path": "../public/_nuxt/index-a875bf46.mjs"
  },
  "/_nuxt/index-d1d3c1a8.mjs": {
    "type": "application/javascript",
    "etag": "\"43d-EOChLAhnQso7XBNcKJok3UbMyjw\"",
    "mtime": "2022-06-08T15:51:12.706Z",
    "path": "../public/_nuxt/index-d1d3c1a8.mjs"
  },
  "/_nuxt/layout-f70a40bc.mjs": {
    "type": "application/javascript",
    "etag": "\"f63-j8BaH4ORzO/+/ZjtpdcLdi3+slc\"",
    "mtime": "2022-06-08T15:51:12.705Z",
    "path": "../public/_nuxt/layout-f70a40bc.mjs"
  },
  "/_nuxt/layout.437e23e2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b65-u208Ktm5r/M2I4KpZYUAFveNmYU\"",
    "mtime": "2022-06-08T15:51:12.704Z",
    "path": "../public/_nuxt/layout.437e23e2.css"
  },
  "/_nuxt/logo.43040818.svg": {
    "type": "image/svg+xml",
    "etag": "\"107-7ale+qmjAXj+q5Tv2kepnulgnoQ\"",
    "mtime": "2022-06-08T15:51:12.703Z",
    "path": "../public/_nuxt/logo.43040818.svg"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"8e3-rdLhRL9oYNoo+KcYKV0uD/whd8M\"",
    "mtime": "2022-06-08T15:51:12.703Z",
    "path": "../public/_nuxt/manifest.json"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = ["/_nuxt"];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _152570 = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _lazy_975292 = () => import('../handlers/renderer.mjs').then(function (n) { return n.a; });

const handlers = [
  { route: '', handler: _152570, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_975292, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_975292, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { nodeServer as n, useRuntimeConfig as u };
//# sourceMappingURL=node-server.mjs.map
