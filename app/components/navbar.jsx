"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";

export default function NavHeader() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="text-3xl font-bold">ultra-marq</p>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/account">
            Account
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}