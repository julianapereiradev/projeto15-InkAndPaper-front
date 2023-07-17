import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import { pages } from "../../routes/routes";

export default function Product({ item }) {
    const navigate = useNavigate();

    function openProductId(productId) {
        navigate(pages.product + productId)
    };

    return (
        <ProductBox
            onClick={() => openProductId(item._id)}
            title={item.title}
        >
            <Image src={item.image} />
            <TextBox>
                <div>{item.title}</div>
                <div style={{fontWeight: 'bold', fontSize: '22px'}}>R${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </TextBox>
        </ProductBox>
    )
}

const ProductBox = styled.div`
  cursor: pointer;
  min-height: 200px;
  min-width: 131px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3vh 1.4vw;
`

const Image = styled.img`
  width: 12.7vw;
  height: 17vw;
  min-width: 110px;
  min-height: 150px;
  border: 5px solid #F6E4C4;
  background-color: #1F1712;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vh;

  img {
    width: 100%;
  }
`

const TextBox = styled.div`
    padding-left: 4px;
    padding-right: 4px;
    border-radius: 2px;
    width: 12.7vw;
    height: 10vh;
    border: 2px solid #F6E4C4;
    font-size: 1.0vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #39332a;
`