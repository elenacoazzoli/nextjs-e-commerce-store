import Link from 'next/link';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { pastaType } from '../util/database';

const PastaTypeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 192px;
  margin-bottom: 64px;
  padding-left: 192px;
  padding-right: 192px;
`;

const PastaInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  margin-left: 64px;
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
  margin-top: 16px;
`;

const PastaDescription = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  margin-top: 16px;
`;
const PastaPrice = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  margin-top: 16px;
`;

const BuyButton = styled.button`
  background-color: #e49c23;
  border: 1px solid transparent;
  border-color: #e49c23;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  width: 120px;
  margin-top: 16px;
  padding: 6px 12px;
  cursor: pointer;
`;

interface PastaItemProps {
  pasta: pastaType;
  onClick: () => void;
}

// to add: pasta weight and pasta cooking time

const PastaProdDescription: FunctionComponent<PastaItemProps> = ({
  pasta,
  onClick,
}) => {
  return (
    <PastaTypeContainer>
      <PastaImage src={pasta.image} />
      <PastaInfoContainer>
        <PastaCategory>{pasta.category.toUpperCase()}</PastaCategory>
        <PastaName>{pasta.name}</PastaName>
        <PastaDescription>{pasta.description}</PastaDescription>
        <PastaPrice>€ {pasta.price}</PastaPrice>
        <BuyButton onClick={onClick}>Add to cart</BuyButton>
      </PastaInfoContainer>
    </PastaTypeContainer>
  );
};

export default PastaProdDescription;
