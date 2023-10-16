import React,{useEffect, useState, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../redux/productAction';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import './Styles/Product.scss'

const Product = () => {
  let baseCls = "product";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products[0]);
  useEffect(() => {
    InitialGetProducts()
  },[])

  const InitialGetProducts = async () => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(res => { dispatch(addProduct(res));})
  };

  const handleProductDetails = (id) => {
    navigate(`/productDetails/${id}`)
  }
  return (
    <div className={`${baseCls}__container`}>
      {products?.map((val) => (
        <div className={`${baseCls}__item`} onClick={() => handleProductDetails(val?.id)}>
          <div className={`${baseCls}__item-image`}>
            <img className={`${baseCls}__image`} src={val?.image}/>
          </div>
          <div className={`${baseCls}__item-title`}>
            {val?.title}
          </div>
          <div className={`${baseCls}__item-description`}>
            {val?.description.slice(0,30) + "..."}
          </div>
          <div className={`${baseCls}__item-price`}>{`Rs: ${val?.price}`}</div>
          <div className={`${baseCls}__item-rating`}>
              <Rating name="half-rating" defaultValue={val?.rating?.rate} precision={0.5} />
          </div>

        </div>
      ))}
      
    </div>
  )
}

export default Product