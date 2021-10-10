import Link from 'next/link';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { pastaType } from '../util/database';

const PastaTypePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px;
  margin-bottom: 32px;
  text-decoration: none;
`;

const PastaTypeContainer = styled.a`
  display: flex;
  flex-direction: column;
  margin: 0 48px 64px 48px;
  text-decoration: none;
`;

const PastaInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #5c5c5c;
  width: 300px;
`;

const PastaImage = styled.img`
  width: 300px;
`;

const PastaCategory = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 200;
  font-size: 1rem;

  margin-top: 32px;
`;
const PastaName = styled.span`
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: 2rem;
  text-decoration: underline 2px solid transparent;
  transition: 0.5s;
  margin-top: 4px;
  color: #2f3b4d;

  :hover {
    text-decoration: underline 2px solid #f6c570;
  }
`;
const PastaPrice = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  margin-top: 8px;
`;

interface PastaItemProps {
  pasta: pastaType;
}

const PastaItem: FunctionComponent<PastaItemProps> = ({ pasta }) => {
  return (
    <PastaTypePlaceholder>
      <Link href={`/products/${pasta.id}`} passHref>
        <PastaTypeContainer aria-label={`Go to product ${pasta.name} page`}>
          <PastaImage src={pasta.image} />
          <PastaInfoContainer>
            <PastaCategory>{pasta.category.toUpperCase()}</PastaCategory>
            <PastaName>{pasta.name}</PastaName>
            <PastaPrice>€ {pasta.price.toFixed(2)}</PastaPrice>
          </PastaInfoContainer>
        </PastaTypeContainer>
      </Link>
    </PastaTypePlaceholder>
  );
};

export default PastaItem;
