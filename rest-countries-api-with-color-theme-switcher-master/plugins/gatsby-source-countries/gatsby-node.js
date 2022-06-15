const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const POST_NODE_TYPE = `Country`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  store,
  cache,
}) => {
  const { createNode } = actions
  const url = "https://restcountries.com/v3.1/all"

  const data = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err))

  // loop through data and create Gatsby nodes
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
      const flagImage = await createRemoteFileNode({
        url: country.flags.png,
        store,
        cache,
        createNode,
        createNodeId: id => `countryPhoto-${country.cca3}`,
      })

      await createNode({
        ...country,
        id: createNodeId(`${POST_NODE_TYPE}-${country.cca3}`),
        parent: null,
        children: [],
        internal: {
          type: POST_NODE_TYPE,
          content: JSON.stringify(Object.assign({}, country, { flagImage })),
          contentDigest: createContentDigest(country),
        },
      })
    })
  return
}
