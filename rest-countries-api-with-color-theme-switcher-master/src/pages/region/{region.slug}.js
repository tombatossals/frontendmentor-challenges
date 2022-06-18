import * as React from "react"
import { graphql } from "gatsby"
import Card from "../../components/card"
import Seo from "../../components/seo"
import MainBar from "../../components/mainbar"

const IndexPage = ({ data, location }) => {
  const region = location.pathname.split("/").slice(-1)[0]
  const [query, setQuery] = React.useState("")

  return (
    <>
      <Seo title={data.allCountry.nodes[0].region} />

      <MainBar region={region} query={query} setQuery={setQuery} />
      <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
        {data.allCountry.nodes
          .filter(country => country.name.common.toLowerCase().includes(query))
          .map(country => (
            <Card key={country.id} data={country} />
          ))}
      </div>
    </>
  )
}

export const query = graphql`
  query ($slug: String) {
    allCountry(filter: { regionSlug: { eq: $slug } }) {
      nodes {
        id
        slug
        name {
          common
        }
        population
        region
        capital
        localImage {
          childImageSharp {
            gatsbyImageData(
              width: 200
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

export default IndexPage
