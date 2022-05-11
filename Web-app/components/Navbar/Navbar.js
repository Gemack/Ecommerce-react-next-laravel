import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsFacebook, BsInstagram, BsTwitter, BsCart4 } from "react-icons/bs";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = ({ cat }) => {
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>clean hand</div>
      <div className={styles.navlink}>
        <div className={styles.navlink1}>
          <Link href="/" passHref>
            home
          </Link>
        </div>
        <div className={styles.navlink1}>
          <Link href="/" passHref>
            about
          </Link>
        </div>

        {cat === true ? (
          <div className={styles.navlink3}>
            <Menu isLazy>
              <MenuButton>CATEGORIES</MenuButton>
              <MenuList>
                <MenuItem>
                  <Link href="/" passHref>
                    Bags
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/" passHref>
                    WristWatch
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/" passHref>
                    Ladies
                  </Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link href="/" passHref>
                    Men
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <div className={styles.navlink3}>
            <Menu isLazy>
              <MenuButton>SOCIALS</MenuButton>
              <MenuList>
                <MenuItem>
                  <a
                    href="http://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <BsFacebook size={30} color="blue" /> facebook
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="http://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <BsTwitter size={30} color="skyblue" /> twitter
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="http://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <BsInstagram size={30} color="pink" /> instagram
                  </a>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}

        <div className={styles.cart}>
          <BsCart4 size={30} color="white" />
          <span className={styles.counter}>4</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
