import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import Image from "next/image";

const ProductWrapper = styled.div`
  
  flex-wrap: wrap;
  justify-content: center;
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  /* img{
    max-width: 100%;
    max-height: 80px;
  } */
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
  
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  display: block;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    /* display: flex; */
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  margin-bottom: 10px;
  margin-top: 15px;
  /* color: ; */
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({_id,title,description,price,images}) {
  const {addProduct} = useContext(CartContext);
  const url2 = '/product/'+_id;
  return (
    <ProductWrapper>
      <WhiteBox href={url2}>
        <div>
          {/* <img src={images?.[0]?.url} alt=""/> */}
          <Image style={{objectFit: "contain"}} width={250} height={100} src={images?.[0]?.url} alt={title}/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url2}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button block onClick={() => addProduct(_id)} primary outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}