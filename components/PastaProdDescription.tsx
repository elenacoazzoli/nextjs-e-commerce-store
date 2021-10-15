import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { PastaType } from '../util/database';

const PastaTypeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 192px;
  margin-bottom: 64px;
  padding-left: 192px;
  padding-right: 192px;
`;

const PastaInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8px;

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
  margin-top: 8px;
`;
const PastaName = styled.span`
  font-family: 'Playfair Display', serif;
  color: #2f3b4d;
  font-weight: 900;
  font-size: 2.5rem;
  margin-top: 16px;
`;

const PastaDescription = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  margin-top: 16px;
`;

const CookingTimeInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const CookingTimeImage = styled.img`
  width: 24px;
`;

const CookingTimeDescription = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  font-size: 1rem;
`;

const WeightInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const WeightImage = styled.img`
  width: 24px;
`;

const WeightDescription = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  font-size: 1rem;
`;

const PastaPrice = styled.span`
  font-family: 'Work Sans', sans-serif;
  font-weight: 800;
  color: #2f3b4d;
  font-size: 1.5rem;
  margin-top: 32px;
`;

const CartButtonsContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  margin-top: 32px;
`;

const AmountButtonsContainer = styled.div`
  background-color: #2f3b4d;
`;

const AmountChangerButton = styled.button`
  background-color: #2f3b4d;
  border: none;

  color: #fff;
  font-family: 'Work Sans', sans-serif;
  padding: 12px 16px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: #c5c5c5;
    color: #2f3b4d;
  }
`;

const AmountNumber = styled.span`
  font-family: 'Work Sans', sans-serif;
  color: #fff;
  font-weight: 400;
  font-size: 1rem;
  padding: 0 16px;
`;

const BuyButton = styled.button`
  background-color: #2f3b4d;
  border: none;
  color: #fff;
  font-family: 'Work Sans', sans-serif;
  width: 240px;
  padding: 12px 12px;
  cursor: pointer;
`;

interface PastaItemProps {
  pasta: PastaType;
  onClick: () => void;
  productAmount: number;
  lessAmount: () => void;
  moreAmount: () => void;
}

const PastaProdDescription: FunctionComponent<PastaItemProps> = ({
  pasta,
  onClick,
  productAmount,
  lessAmount,
  moreAmount,
}) => {
  return (
    <PastaTypeContainer>
      <PastaImage
        alt={`picture of ${pasta.name}`}
        src={`/images/${pasta.image}`}
      />
      <PastaInfoContainer>
        <PastaCategory>{pasta.category.toUpperCase()}</PastaCategory>
        <PastaName>{pasta.name}</PastaName>
        <PastaDescription>{pasta.description}</PastaDescription>
        <WeightInfoContainer>
          <CookingTimeInfoContainer>
            <CookingTimeImage alt="cooking time" src="/images/wallclock.png" />
            <CookingTimeDescription>
              {pasta.cookingTime} min
            </CookingTimeDescription>
          </CookingTimeInfoContainer>
          <WeightInfoContainer>
            <WeightImage alt="scale" src="/images/scale.png" />
            <WeightDescription>{pasta.weight}g.</WeightDescription>
          </WeightInfoContainer>
        </WeightInfoContainer>

        <PastaPrice>€ {(pasta.price / 100).toFixed(2)}</PastaPrice>
        <CartButtonsContainer>
          <AmountButtonsContainer>
            <AmountChangerButton
              disabled={productAmount < 2}
              onClick={lessAmount}
            >
              -
            </AmountChangerButton>
            <AmountNumber>{productAmount}</AmountNumber>
            <AmountChangerButton onClick={moreAmount}>+</AmountChangerButton>
          </AmountButtonsContainer>
          <BuyButton onClick={onClick}>ADD TO CART</BuyButton>
        </CartButtonsContainer>
      </PastaInfoContainer>
    </PastaTypeContainer>
  );
};

export default PastaProdDescription;
