import React from "react"
import { Link } from "gatsby"
import { Menu, Transition } from "@headlessui/react"

import { Fragment } from "react"
import { ChevronDownIcon } from "@heroicons/react/solid"

const RegionSelector = () => (
  <Menu as="div" className="relative inline-block text-left">
    <Menu.Button className="inline-flex w-full w-56 justify-center rounded-md element px-4 py-3 text-sm font-medium ">
      Filter by Region
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
          {["Africa", "America", "Asia", "Europe", "Oceania"].map(r => (
            <Menu.Item key={r}>
              {({ active }) => (
                <Link
                  to={`/region/${r.toLocaleLowerCase()}`}
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:font-semibold"
                >
                  {r}
                </Link>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
)

export default RegionSelector
