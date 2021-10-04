import Link from 'next/link';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: #faf7f6;
`;

const LogoImage = styled.div`
  content: '';
  background: url('https://static1.squarespace.com/static/5caf50e090f904ee8b86f607/t/5eac08b9befe934969493189/1588332729547/Artboard+%E2%80%93+2.png');
  width: 200px;
  height: 200px;
  background-size: 100px;
  background-repeat: no-repeat;
  position: absolute;
  z-index: -2;
  left: 4%;
  top: 12%;
`;
const Logo = styled.span`
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: 3rem;
  z-index: 2;
  box-shadow: inset 0 -18px 0 rgb(240 202 122);
  margin-left: 64px;
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
  transition: 0.5s;
  padding: 12px 0 2px 0;
  font-family: 'Work Sans', sans-serif;
  font-weight: 200;
  font-size: 1rem;

  :hover {
    border-bottom: 2px solid #e49c23;
  }
`;

const Header: FunctionComponent = () => {
  return (
    <HeaderStyled>
      <NavigationBar>
        <div>
          <LogoImage />
          <Logo>pastabilities</Logo>
        </div>
        <Pages>
          <Link href="/">
            <PageLink>HOME</PageLink>
          </Link>
          <Link href="/products">
            <PageLink>OUR PRODUCTS</PageLink>
          </Link>
          <Link href="/about">
            <PageLink>ABOUT</PageLink>
          </Link>
        </Pages>
        <PageLink>CART</PageLink>
      </NavigationBar>
    </HeaderStyled>
  );
};

export default Header;
