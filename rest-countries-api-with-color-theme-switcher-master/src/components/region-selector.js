import React from "react"
import { Link } from "gatsby"
import { Menu, Transition } from "@headlessui/react"
import { useStaticQuery, graphql } from "gatsby"

import { Fragment } from "react"
import { ChevronDownIcon, XIcon } from "@heroicons/react/solid"

const RegionSelector = ({ region }) => {
  const { allRegion } = useStaticQuery(graphql`
    query {
      allRegion {
        nodes {
          name
          slug
        }
      }
    }
  `)

  allRegion.nodes.sort((a, b) =>
    a.slug > b.slug ? 1 : b.slug > a.slug ? -1 : 0
  )

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full w-56 justify-center rounded-md element px-4 py-3 text-sm font-medium ">
        {region ? (
          <>
            <Link to="/" className="mr-4">
              <XIcon className="h-5 w-5" />
            </Link>
            Region: <strong className="pl-2">{region}</strong>
          </>
        ) : (
          "Filter by Region"
        )}
        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 left-0 mt-2 w-56 origin-top-right divide-y rounded-md shadow-lg element">
          <div className="px-1 py-1 ">
            {allRegion.nodes.map(region => (
              <Menu.Item key={region.slug}>
                {({ active }) => (
                  <Link
                    to={`/region/${region.slug}`}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:font-semibold"
                  >
                    {region.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default RegionSelector
