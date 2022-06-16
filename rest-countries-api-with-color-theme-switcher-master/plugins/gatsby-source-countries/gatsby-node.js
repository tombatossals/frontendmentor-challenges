const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const NODE_TYPE = `Country`

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

  data
    .map(
      ({
        cca3,
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
        cca3,
        slug: {
          country: slugify(name.common),
          region: slugify(region),
        },
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
        id: createNodeId(`${NODE_TYPE}-${country.cca3}`),
        parent: null,
        children: [],
        internal: {
          type: NODE_TYPE,
          content: JSON.stringify(country),
          contentDigest: createContentDigest(country),
        },
      })
    })
  return
}
