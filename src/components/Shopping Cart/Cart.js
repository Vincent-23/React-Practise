import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './Styles/Cart.scss'

const Cart = () => {
    let baseCls = "cart";
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        let cartDatas = JSON.parse(localStorage.getItem("User"));
        setCartData(cartDatas);
    }, [])

    useEffect(() => {
        localStorage.setItem("User", JSON.stringify(cartData));
    }, [cartData])

    const handlePlus = (ind) => {
        let data = [...cartData];
        if (!!data[ind]?.title) {
            data[ind].quantity = data[ind]?.quantity + 1;
            setCartData(data);
        }
    }

    const handleMinus = (ind) => {
        let data = [...cartData];
        if (!!data[ind]?.title) {
            if (data[ind].quantity > 0) {
                data[ind].quantity = data[ind]?.quantity - 1;
                setCartData(data);
            }

        }
    }

    const handleDelete = (id) => {
        setCartData(cartData.filter((item) => item.id !== id))
    }

    return (
        <div className={`${baseCls}_container`}>
            {
                cartData.length > 0 ? (cartData?.map((val, ind) => (
                    <div className={`${baseCls}_item-container`} key={val.id}>
                        <div className={`${baseCls}_item`}>
                            <img className={`${baseCls}_image`} src={val?.image} />
                        </div>
                        <div className={`${baseCls}_item`}>{val.title}</div>
                        <div className={`${baseCls}_item`}>{val.price}</div>
                        <div className={`${baseCls}_item-quantity`}>
                            <button className={`${baseCls}_quantity-btn`} onClick={() => handlePlus(ind)}>+</button>
                            <h2 className={`${baseCls}_quantity-value`}>{`${' '}${val.quantity}`}</h2>
                            <button className={`${baseCls}_quantity-btn`} onClick={() => handleMinus(ind)}>-</button>
                        </div>
                        <div className={`${baseCls}_delete-btn`} onClick={() => handleDelete(val.id)}><DeleteIcon /></div>
                    </div>
                ))
                ) : <div className={`${baseCls}_no-data`}>No Cart Product</div>
            }
        </div>
    )
}

export default Cart;