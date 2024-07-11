import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {



  
}

export default Navbar

import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from '@/components/navbar'
import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection } from '@/components/sidebar'
import { StackedLayout } from '@/components/stacked-layout'
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/16/solid'

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'Events', url: '/events' },
]



function Example() {
  return (
    <StackedLayout
      navbar={
        <Navbar>
            <Avatar src="./../assets/touredit_logo.png" />
            <NavbarLabel>TouredIt</NavbarLabel>
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
            {navItems.map(({ label, url }) => (
              <NavbarItem key={label} href={url}>
                {label}
              </NavbarItem>
            ))}
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/" square />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/my-profile">
                  <UserIcon />
                  <DropdownLabel>My profile</DropdownLabel> 
                </DropdownItem>
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/privacy-policy">
                  <ShieldCheckIcon />
                  <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/share-feedback">
                  <LightBulbIcon />
                  <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/">
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
            <SidebarHeader>
                <Avatar src="/tailwind-logo.svg" />
                <SidebarLabel>Tailwind Labs</SidebarLabel>
            </SidebarHeader>
            <SidebarBody>
                <SidebarSection>
                {navItems.map(({ label, url }) => (
                    <SidebarItem key={label} href={url}>
                    {label}
                    </SidebarItem>
                ))}
                </SidebarSection>
            </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </StackedLayout>
  )
}