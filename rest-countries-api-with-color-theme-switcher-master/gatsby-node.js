const path = require(`path`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const countryTemplate = path.resolve(`src/templates/country.js`)
  const regionTemplate = path.resolve(`src/templates/country.js`)
  const result = await graphql(`
    query {
      allCountry {
        nodes {
          slug {
            country
            region
          }
          region
        }
      }
    }
  `)
  result.data.allCountry.nodes.forEach(node => {
    createPage({
      path: `/regions/${node.slug.region}/${node.slug.country}`,
      component: countryTemplate,
      context: {
        slug: node.slug,
      },
    })
  })
}
