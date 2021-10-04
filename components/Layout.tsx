import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Header from './Header';

const PageContainer = styled.main`
  margin: 120px 64px 0 64px;
  height: 2000px;
`;

const Layout: FunctionComponent = (props) => {
  return (
    <>
      <Header />
      <PageContainer>{props.children}</PageContainer>
    </>
  );
};

export default Layout;
