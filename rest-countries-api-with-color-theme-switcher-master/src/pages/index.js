import * as React from "react"
import { graphql } from "gatsby"
import Card from "../components/card"
import Seo from "../components/seo"
import MainBar from "../components/mainbar"
const IndexPage = ({ data }) => {
  const [query, setQuery] = React.useState("")

  return (
    <>
      <Seo title="Home" />
      <MainBar query={query} setQuery={setQuery} />

      <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
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
  query {
    allCountry {
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
