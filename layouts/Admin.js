import React, {useState, useEffect, Fragment, useLayoutEffect} from "react";
import { Menu, Transition } from '@headlessui/react';
import { useUser } from "@auth0/nextjs-auth0";
import {supabase} from '../utils/supabase';
import {
  MenuAlt2Icon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

// components
import Sidebar from "../components/Sidebar"

export default function Admin({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function findAndCreateUser () {

      const { data } = await supabase
      .from('users')
      .select('email')
      .filter('email', 'eq', user.email)
  
      if(!data.length > 0) {
        const { data } =  await supabase
        .from('users')
        .insert([
          { name: user.name, email: user.email },
        ])
   
        setPrismaUser({
          prismaUser : {
            ...data
          }
        })
      } 

      console.log('user exists already');
      
  
    };
    if(user) {
      findAndCreateUser()
    }
  }, [user]);

  

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <div className="h-screen flex overflow-hidden font-sans">
      
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <div className="flex flex-col w-full flex-1 overflow-hidden dark:bg-dark-700 p-3">
        <div className="relative z-10 flex-shrink-0 flex h-16">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-col justify-center px-4">
            {/* {user ? <h1>Hello {user.given_name} </h1> : <h1>Hello buddy </h1>} */}
            Dashboard
          </div>
          <div className="flex-1 px-4 py-4 flex justify-end">
            <div className="flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search for bits"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        {user ? user.given_name[0] : ""}
                      </Menu.Button>
                    </div>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}


