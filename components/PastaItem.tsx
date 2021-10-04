import Link from 'next/link';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { pastaType } from '../util/database';

const PastaTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.33%;
  padding: 0 32px;
  margin-bottom: 64px;
`;

const PastaInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #5c5c5c;
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
  margin-top: 4px;
`;
const PastaPrice = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  margin-top: 16px;
`;

interface PastaItemProps {
  pasta: pastaType;
}

const PastaItem: FunctionComponent<PastaItemProps> = ({ pasta }) => {
  return (
    <Link href={`/products/${pasta.id}`}>
      <PastaTypeContainer>
        <PastaImage src={pasta.image} />
        <PastaInfoContainer>
          <PastaCategory>{pasta.category.toUpperCase()}</PastaCategory>
          <PastaName>{pasta.name}</PastaName>
          <PastaPrice>€ {pasta.price}</PastaPrice>
        </PastaInfoContainer>
      </PastaTypeContainer>
    </Link>
  );
};

export default PastaItem;
