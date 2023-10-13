import React,{useState, useEffect} from 'react';
import './Styles/Cart.scss'

const Cart = () => {
    let baseCls = "cart";
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        let cartDatas = JSON.parse(localStorage.getItem("User"));
        setCartData([...cartData, cartDatas]);
    },[])
    console.log('cart!',cartData)
  return (
    <div className={`${baseCls}_container`}>
        {
            cartData?.map((val) => (
                <div className={`${baseCls}_item-container`}>
                 <div className={`${baseCls}_item`}>
                <img className={`${baseCls}_image`} src={val?.thumbnail}/>
            </div>
            <div className={`${baseCls}_item`}>{val.title}</div>
            <div className={`${baseCls}_item`}>{val.price}</div>
            <div className={`${baseCls}_item`}>quantity</div>
                </div>
            ))
        }
    </div>
  )
}

export default Cart;