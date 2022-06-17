import * as React from "react"
import { graphql } from "gatsby"
import Card from "../components/card"
import Layout from "../components/layout"
import Seo from "../components/seo"

const RegionTemplate = ({ data }) => {
  return (
    <Layout>
      <Seo title="Home" />
      <div className="mx-10 grid grid-cols-1 md:grid-cols-4 gap-20">
        {data.allCountry.nodes.map(country => (
          <Card key={country.id} data={country} />
        ))}
      </div>
    </Layout>
  )
}

export default RegionTemplate
