const COUNTRY_NODE_TYPE = `Country`
const REGION_NODE_TYPE = `Region`

const slugify = str => {
  str = str.replace(/^\s+|\s+$/g, "")
  str = str.toLowerCase()
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
  var to = "aaaaeeeeiiiioooouuuunc------"
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  return str
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions
  const url = "https://restcountries.com/v3.1/all"

  const data = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err))

  const regions = [...new Set(data.map(c => c.region))]

  regions.map(async r => {
    const region = {
      name: r,
      slug: slugify(r),
    }

    await createNode({
      ...region,
      id: createNodeId(`${REGION_NODE_TYPE}-${region.slug}`),
      parent: null,
      children: [],
      internal: {
        type: REGION_NODE_TYPE,
        content: JSON.stringify(region),
        contentDigest: createContentDigest(region),
      },
    })
  })

  data
    .map(
      ({
        name,
        cca3,
        region,
        subregion,
        tld,
        currencies,
        languages,
        borders,
        capital,
        population,
        flags,
      }) => ({
        slug: slugify(name.common),
        name: {
          common: name.common,
          nativeName: name.nativeName
            ? Object.entries(name.nativeName)
                .map(c => `${c[1].common} (${c[0].toUpperCase()})`)
                .join(", ")
            : name.common,
        },
        cca3,
        region,
        regionSlug: slugify(region),
        subregion,
        tld,
        currencies: currencies && Object.values(currencies).map(c => c.name),
        languages: languages && Object.values(languages),
        borders,
        capital,
        population,
        flag: flags.png.replace("w320", "w1280"),
      })
    )
    .map(async country => {
      const node = await createNode({
        ...country,
        id: createNodeId(`${COUNTRY_NODE_TYPE}-${country.slug}`),
        parent: null,
        children: [],
        internal: {
          type: COUNTRY_NODE_TYPE,
          content: JSON.stringify(country),
          contentDigest: createContentDigest(country),
        },
      })
    })
}
