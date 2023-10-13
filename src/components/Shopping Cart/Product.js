import React,{useEffect, useState, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../redux/productAction';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import './Styles/Product.scss'

const Product = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products[0]);
  useEffect(() => {
    InitialGetProducts()
  },[])

  const InitialGetProducts = async () => {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res => { dispatch(addProduct(res.products));})
  };

  const handleProductDetails = (id) => {
    navigate(`/productDetails/${id}`)
  }
console.log('products!',products)
  return (
    <div className='container'>
      {products?.map((val) => (
        <div className='item' onClick={() => handleProductDetails(val?.id)}>
          <div className='item-image'>
            <img src={val?.thumbnail}/>
          </div>
          <div className='item-title'>
            {val?.title}
          </div>
          <div className='item-description'>
            {val?.description.slice(0,30) + "..."}
          </div>
          <div className='item-price'>{`Rs: ${val?.price}`}</div>
          <div className='item-rating'>
              <Rating name="half-rating" defaultValue={val?.rating} precision={0.5} />
          </div>

        </div>
      ))}
      
    </div>
  )
}

export default Product