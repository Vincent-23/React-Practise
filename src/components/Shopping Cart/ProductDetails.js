import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Rating from '@mui/material/Rating';
import "./Styles/ProductDetails.scss";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const baseCls = "product_detail";

  const { id } = useParams();
  var products =  useSelector((state) => state.product.products[0]);
  const navigate = useNavigate();
  const [cartProduct, setCartProduct] = useState([]);
  const [ productData, setProductData] = useState([]);

  useEffect(() => {
    let productValue = products?.filter((val) => val.id === parseInt(id))[0];
    setProductData(productValue);
    // setCartProduct((prevProduct) => [ ...prevProduct, productValue]);
  },[products])

  const handleLimitDescription = (para) => {
    const maxLength = 100; // Maximum length for the description

    let truncatedDescription = para;

    if (para?.length > maxLength) {
      truncatedDescription = para.substring(0, maxLength) + "...";
    }
    return truncatedDescription;
  };

  const handleOfferPercentage = (price) => {
    const min = 1; // Minimum value (inclusive)
    const max = 50; // Maximum value (exclusive)

    const randomValue = Math.floor(Math.random() * (max - min)) + min;
    const originalPrice = (price * 100) / (100 - randomValue);
    return `₹${originalPrice.toFixed(2)}`;
  };

  const renderbackArrow = () => {
    return (
      <div className="product_detail-back-arrow" onClick={() => navigate('/product')}>
        <ArrowBackIcon />
      </div>
    )
  }

  const checkIfIdExists = (idToCheck) => {
    let isValid;
    if(cartProduct.length > 0){
      isValid = cartProduct?.some(item => item.id === idToCheck);
    }else{
      isValid = false;
    }
    return isValid;
  };

  const handleCart = async (id) => {
    const Obj = {
      id: productData?.id,
      title: productData?.title,
      description: productData?.description,
      image: productData?.image,
      rating: productData?.rating?.rate,
      price :productData?.price,
      quantity:0
    }
    let cartDatas = JSON.parse(localStorage.getItem("User"));
    let newCartProduct = [ ...cartProduct, Obj]
    let removeDiplicate =  await newCartProduct.filter((item,index) => newCartProduct.findIndex((i) => i.id === item.id) === index);
      await setCartProduct(removeDiplicate);
      await navigate('/cart');
  }

  useEffect(() => {
    if(cartProduct) localStorage.setItem('User',JSON.stringify(cartProduct));
  },[cartProduct]);

  return (
    <div className={`${baseCls}_container`}>
      <div className={`${baseCls}_item`}>
        <div className={`${baseCls}_item_image`}>
          <img className={`${baseCls}_image`}
            src={productData?.image}
          />
        </div>
      </div>
      <div className={`${baseCls}_item`}>
        <div className={`${baseCls}_item_details`}>
          <div className={`${baseCls}_card_content`}>
            <h2 className={`${baseCls}_title`}>
              {productData?.title}
            </h2>
            <p className={`${baseCls}_text`}>
              {handleLimitDescription(productData?.description)}
            </p>
            <div className={`${baseCls}_rating_container`}>
              <div className={`${baseCls}_rating_item`}>{}</div>
              <div className={`${baseCls}_rating_item`}>
                <Rating name="half-rating" defaultValue={productData?.rating?.rate} precision={0.5} />
              </div>
            </div>
            <div className={`${baseCls}_price_container`}>
              <div className={`${baseCls}_price_item_1`}>{`₹ ${productData?.price}${' '} ${`(${productData?.discountPercentage}% off)`}`}</div>
              <div className={`${baseCls}_price_item_2`}>
                <p
                  className="disabled"
                >{`M.R.P:${handleOfferPercentage(productData?.price)}`}</p>
              </div>
              <div
                className={`${baseCls}_price_item_3`}></div>
              {/* <p className="disabled"></p> */}
            </div>
          </div>
          <div className={`${baseCls}_add-cart-btn`}>
            <button className={`${baseCls}_add-btn`} onClick={() => handleCart(productData?.id)}>Add to cart</button>
          </div>
        </div>
      </div>
      <div className={`${baseCls}_back-btn`}>
          {renderbackArrow()}
      </div>
    </div>
  );
};

export default ProductDetails;
