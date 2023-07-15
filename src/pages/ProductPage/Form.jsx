import { useNavigate } from "react-router-dom";
import { headersAuth, pages, requisitions } from "../../routes/routes";
import { styled } from "styled-components";
import { useState } from "react";
import axios from "axios";

export default function Form({id, token, product}) {
    const navigate = useNavigate();
    const [shopQauntity, setShopQuantity] = useState(1);
    const [mayISubmit, setMayISubmit] = useState(true);
    let destiny;

    function HandleSubmit(e) {
        e.preventDefault();
        setMayISubmit(false);
        const informations = { id, quantity: shopQauntity }

        axios.post(requisitions.postShoppingCart + id, informations, headersAuth(token))
            .then(resp => {
                navigate(destiny);
            })
            .catch(error => {
                alert(error.response.data);
                setMayISubmit(true);
            })
    }

    return (
        <FormSC onSubmit={e => HandleSubmit(e)}>

            <div>
                <ProductQuantity>
                    <ChangeQuantityButton
                        type="button"
                        onClick={() => setShopQuantity(shopQauntity - (shopQauntity > 1 ? 1 : 0))}
                        data-position="left"
                    >
                        -
                    </ChangeQuantityButton>

                    <input
                        type="number"
                        required
                        value={shopQauntity}
                        onChange={e => setShopQuantity(e.target.value)} />

                    <ChangeQuantityButton
                        type="button"
                        onClick={() => setShopQuantity(shopQauntity + (shopQauntity < product.quantityInStock ? 1 : 0))}
                        data-position="right"
                    >
                        +
                    </ChangeQuantityButton>
                </ProductQuantity>
                <SubmitButton
                    type="submit"
                    disabled={!mayISubmit}
                    onClick={() => destiny = pages.home}
                >
                    Adicionar ao <br /> Carrinho
                </SubmitButton>

            </div>
            <div>
                <Price>R$ <strong>{product.price}</strong></Price>
                <SubmitButton
                    type="submit"
                    disabled={!mayISubmit}
                    onClick={() => destiny = pages.shoppingCart}
                >
                    Comprar <br /> agora
                </SubmitButton>
            </div>
        </FormSC>
    )
}

const FormSC = styled.form`
  width: 100%;
  height: 30vh;
  font-family: Inika, serif;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    height: 100%;
    width: 24vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

const SubmitButton = styled.button`
  height: 10vh;
  width: 100%;
  font-size: 3.6vh;
  color: #000000;
  background-color: #F6E4C4;
  border-radius: 10px;
`

const ProductQuantity = styled.div`
  width: 24vw;
  height: 6.3vh;
  position: relative;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;

  input {
    width: 100%;
    border-radius: 10px;
    text-align: center;
    font-size: 5vh;
  }
`
const ChangeQuantityButton = styled.button`
  height: 6.3vh;
  width: 6.3vh;
  text-align: center;
  font-size: 4vh;
  border-radius: 10px;
  background-color: #F6E4C4;
  position: absolute;
  ${props => props['data-position']}: 0;
`

const Price = styled.span`
  display: flex;
  color: #fff;
  font-size: 4.5vh;

  strong {
    font-size: 9vh;
  }
`