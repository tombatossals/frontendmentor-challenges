const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

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

  const regions = []
  data
    .map(
      ({
        name,
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
        name,
        region,
        subregion,
        tld,
        currencies,
        languages,
        borders,
        capital,
        population,
        flags,
      })
    )
    .map(async country => {
      await createNode({
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
      if (!regions.includes(slugify(country.region))) {
        const region = { name: country.region, slug: slugify(country.region) }
        await createNode({
          ...country,
          id: createNodeId(`${REGION_NODE_TYPE}-${region.slug}`),
          parent: null,
          children: [],
          internal: {
            type: COUNTRY_NODE_TYPE,
            content: JSON.stringify(region),
            contentDigest: createContentDigest(region),
          },
        })
      }
    })
}
