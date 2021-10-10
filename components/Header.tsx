import Cookies from 'js-cookie';
import Link from 'next/link';
import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { cookieType } from '../util/cookies';

const HeaderStyled = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: #faf7f6;
  z-index: 99;
`;

const LogoImage = styled.div`
  content: '';
  background: url('https://static1.squarespace.com/static/5caf50e090f904ee8b86f607/t/5eac08b9befe934969493189/1588332729547/Artboard+%E2%80%93+2.png');
  width: 160px;
  height: 160px;
  background-size: 80px;
  background-repeat: no-repeat;
  position: absolute;
  z-index: -2;
  left: 4%;
  top: 32%;
`;
const Logo = styled.span`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 3rem;
  z-index: 2;
  box-shadow: inset 0 -16px 0 #f6c570;
  margin-left: 32px;
`;

const NavigationBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 64px;
  padding: 16px 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Pages = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
`;

const PageLink = styled.a`
  cursor: pointer;
  border-bottom: 2px solid transparent;
  text-decoration: none;
  transition: 0.5s;
  padding: 16px 0 2px 0;
  font-family: 'Work Sans', sans-serif;
  color: #5c5c5c;
  font-weight: 200;
  font-size: 1rem;

  :hover {
    border-bottom: 2px solid #f6c570;
  }
`;

interface HeaderProps {
  cartItemsNumber: number;
}

const Header: FunctionComponent<HeaderProps> = ({ cartItemsNumber }) => {
  return (
    <HeaderStyled>
      <NavigationBar>
        <div>
          <LogoImage />
          <Logo>pastabilities</Logo>
        </div>
        <Pages>
          <Link href="/" passHref>
            <PageLink>HOME</PageLink>
          </Link>
          <Link href="/products" passHref>
            <PageLink>OUR PRODUCTS</PageLink>
          </Link>
          <Link href="/about" passHref>
            <PageLink>ABOUT</PageLink>
          </Link>
        </Pages>
        <Link href="/cart" passHref>
          <PageLink>CART ( {cartItemsNumber} )</PageLink>
        </Link>
      </NavigationBar>
    </HeaderStyled>
  );
};

export default Header;
