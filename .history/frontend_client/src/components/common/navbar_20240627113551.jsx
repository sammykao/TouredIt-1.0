import React from 'react';
import { UserIcon, Cog8ToothIcon, LightBulbIcon, ShieldExclamationIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/solid';

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'Contact Us', url: '/contact-us' },
];

const Navbar = ({ children }) => (
  <nav className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
    {children}
  </nav>
);

const NavbarItem = ({ href, children }) => (
  <a href={href} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
    {children}
  </a>
);

const Dropdown = ({ children }) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

const DropdownButton = ({ children }) => (
  <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    {children}
  </button>
);

const DropdownMenu = ({ children }) => (
  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
    <div className="py-1">
      {children}
    </div>
  </div>
);

const DropdownItem = ({ href, children }) => (
  <a href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
    {children}
  </a>
);

const Sidebar = ({ children }) => (
  <div className="bg-gray-100 h-screen p-4">
    {children}
  </div>
);

const StackedLayout = ({ navbar, sidebar, children }) => (
  <div className="flex h-screen overflow-hidden">
    <div className="flex flex-col w-64">
      {sidebar}
    </div>
    <div className="flex flex-1 flex-col">
      {navbar}
      <main className="flex-1 overflow-auto p-4">
        {children}
      </main>
    </div>
  </div>
);

const NavbarComponent = () => {
  return (
    <StackedLayout
      navbar={
        <Navbar>
          <div className="flex items-center">
            <img src="./../assets/touredit_logo.png" alt="TouredIt Logo" className="h-8 w-8" />
            <span className="ml-3 text-xl font-semibold text-gray-900">TouredIt</span>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {navItems.map(({ label, url }) => (
              <NavbarItem key={label} href={url}>
                {label}
              </NavbarItem>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Dropdown>
              <DropdownButton>
                <UserIcon className="h-5 w-5 text-gray-700" />
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem href="/my-profile">
                  <Cog8ToothIcon className="h-5 w-5 mr-2" />
                  My Account
                </DropdownItem>
                <DropdownItem href="/">
                  <LightBulbIcon className="h-5 w-5 mr-2" />
                  Rate a Guide
                </DropdownItem>
                <DropdownItem href="/">
                  <ShieldExclamationIcon className="h-5 w-5 mr-2" />
                  Privacy policy
                </DropdownItem>
                <DropdownItem href="/">
                  <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" />
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <div className="flex items-center p-4">
            <img src="/touredit_logo.png" alt="TouredIt Logo" className="h-8 w-8" />
            <span className="ml-3 text-xl font-semibold text-gray-900">TouredIt</span>
          </div>
          <div className="mt-4">
            {navItems.map(({ label, url }) => (
              <a key={label} href={url} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                {label}
              </a>
            ))}
          </div>
        </Sidebar>
      }
    >
    </StackedLayout>
  );
};

export default NavbarComponent;
