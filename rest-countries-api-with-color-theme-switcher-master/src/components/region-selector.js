import React from "react"
import { Link } from "gatsby"
import { Menu, Transition } from "@headlessui/react"

import { Fragment } from "react"
import { ChevronDownIcon } from "@heroicons/react/solid"

const RegionSelector = () => (
  <Menu as="div" className="relative inline-block text-left mx-8">
    <Menu.Button className="inline-flex w-full w-56 justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      Filter by Region
      <ChevronDownIcon
        className="ml-2 -mr-1 h-5 w-5 text-black hover:text-gray-800"
        aria-hidden="true"
      />
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
      <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1 ">
          {["Africa", "America", "Asia", "Europe", "Oceania"].map(r => (
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/${r.toLocaleLowerCase()}`}
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
