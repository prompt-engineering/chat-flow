import React from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link as NavLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@/components/ChakraUI";
import { ChevronDownIcon, ExternalLinkIcon, HamburgerIcon } from "@/components/ChakraUI/icons";
import Link from "next/link";
import { GITHUB_URL } from "@/configs/constants";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getAppData } from "@/i18n";

export default async function NavBar({ locale }: { locale: string }) {
  const { pathname } = await getAppData();

  const NavList = [
    {
      title: "Flow",
      url: `/click-flow/`,
    },
    {
      title: "ChatApp",
      url: `/chatgpt/`,
    },
    {
      title: "Flow Editor",
      url: `/flow-editor/`,
    },
  ];

  return (
    <Flex align='center' py='4' pl='20px' pr={{ md: "20px", base: "4px" }} boxShadow='base'>
      <Flex>
        <Heading size='md' mr={4}>
          <Link href={"/"}>ChatFlow</Link>
        </Heading>
        <Flex align='center' display={{ md: "flex", base: "none" }}>
          {NavList.map((nav: any) => {
            // 如果当前导航项有子菜单，则呈现为下拉菜单
            if (nav?.children) {
              return (
                <Menu key={nav.title}>
                  <MenuButton mr={4}>
                    {nav.title}
                    <ChevronDownIcon />
                  </MenuButton>
                  <MenuList>
                    {nav.children.map((child: any) => (
                      <MenuItem key={child.url} as={Link} href={child.url}>
                        <Box mr={4} color={pathname === child.url ? "#108EE9" : "black"}>
                          {child.title}
                        </Box>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              );
            } else {
              // 否则呈现为单独的链接
              return (
                <Link key={nav.url} href={nav.url}>
                  <Box mr={4} color={pathname === nav.url ? "#108EE9" : "black"}>
                    {nav.title}
                  </Box>
                </Link>
              );
            }
          })}
        </Flex>
      </Flex>
      <Spacer />
      <LocaleSwitcher locale={locale} />
      <NavLink display={{ md: "block", base: "none" }} href={GITHUB_URL} isExternal>
        GitHub <ExternalLinkIcon mx='2px' />
      </NavLink>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
          display={{ md: "none", base: "block" }}
          mr={4}
        />
        <MenuList display={{ md: "none", base: "block" }}>
          {NavList.map((nav: any) =>
            nav.children ? (
              nav.children.map((child: any) => (
                <MenuItem key={child.url} as={Link} href={child.url}>
                  <Box mr={4} color={pathname === child.url ? "#108EE9" : "black"}>
                    {child.title}
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem as={Link} href={nav.url} key={nav.url}>
                <Box mr={4} color={pathname === nav.url ? "#108EE9" : "black"}>
                  {nav.title}
                </Box>
              </MenuItem>
            ),
          )}
          <MenuItem>
            <NavLink href={GITHUB_URL} isExternal>
              GitHub <ExternalLinkIcon mx='2px' />
            </NavLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
