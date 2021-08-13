import React from 'react'
import Link from 'next/link'
import routes from '../../routes'
import * as Icons from '../../public/images/icons'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        Windmill
      </a>
      <ul className="mt-6">
        {routes.map((route) =>
            <li className="relative px-6 py-3" key={route.name}>
              <Link
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4">{route.name}</span>
              </Link>
            </li>
        )}
      </ul>
      <div className="px-6 my-6">
        <button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </button>
      </div>
    </div>
  )
}

export default SidebarContent
