import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Header from './Header';

const PageContainer = styled.main`
  margin: 160px 64px 0 64px;
`;

interface LayoutProps {
  cartItemsNumber: number;
}

const Layout: FunctionComponent<LayoutProps> = ({
  cartItemsNumber,
  children,
}) => {
  return (
    <>
      <Header cartItemsNumber={cartItemsNumber} />
      <PageContainer>{children}</PageContainer>
    </>
  );
};

export default Layout;
