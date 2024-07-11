import React from 'react';
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
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldExclamationIcon,
  UserIcon,
} from '@heroicons/react/16/solid'


const navItems = [
  { label: 'Home', url: '/' },
  { label: 'Contact Us', url: '/contact-us' },
];



const navbar() {
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
                    <UserIcon />
                </DropdownButton>
                <DropdownMenu className="min-w-64" anchor="bottom end">
                    <DropdownItem href="/my-profile">
                        <Cog8ToothIcon />
                        <DropdownLabel>My Account</DropdownLabel> 
                    </DropdownItem>
                    <DropdownItem href="/">
                        <LightBulbIcon />
                        <DropdownLabel>Rate a Guide</DropdownLabel>
                    </DropdownItem>
                    <DropdownItem href="/">
                        <ShieldExclamationIcon />
                        <DropdownLabel>Privacy policy</DropdownLabel>
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
                <Avatar src="/touredit_logo.png" />
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