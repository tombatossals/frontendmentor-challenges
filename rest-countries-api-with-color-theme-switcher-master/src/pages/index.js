import * as React from "react"
import { graphql } from "gatsby"
import Card from "../components/card"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Seo title="Home" />
      <div className="mx-10 grid grid-cols-4 gap-20">
        {data.allCountry.nodes.map(country => (
          <Card key={country.id} data={country} />
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allCountry {
      nodes {
        id
        slug {
          country
          region
        }
        name {
          official
        }
        population
        region
        capital
        localImage {
          childImageSharp {
            gatsbyImageData(
              width: 200
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`

export default IndexPage
