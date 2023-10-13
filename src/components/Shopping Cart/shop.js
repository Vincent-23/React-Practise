import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import classes from "./Styles/Shop.scss";
import { GetProduct } from "../../services/productsService";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions/productAction";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [productData, setProductData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    InitialGetProducts();
  }, []);

  const InitialGetProducts = async () => {
    const res = await GetProduct();
    if (res.status === 200 && res.statusText === "OK") {
      await dispatch(createProduct(res.data));
      await setProductData(res.data);
    }
  };

  const handleOfferPercentage = (price) => {
    const min = 1; // Minimum value (inclusive)
    const max = 50; // Maximum value (exclusive)

    const randomValue = Math.floor(Math.random() * (max - min)) + min;
    console.log("randomValue", randomValue);
    const originalPrice = (price * 100) / (100 - randomValue);
    return `₹${originalPrice.toFixed(2)}`;
  };

  const handleLimitDescription = (para) => {
    const maxLength = 20; // Maximum length for the description

    let truncatedDescription = para;

    if (para.length > maxLength) {
      truncatedDescription = para.substring(0, maxLength) + "...";
    }
    return truncatedDescription;
  };

  const handleProductDetail = (id) => {
    navigate(`product/${id}`);
  };

  return (
    <div className={classes.main}>
      <ul className={classes.cards}>
        {productData.length &&
          productData.map((val) => (
            <li
              className={classes.cards_item}
              key={val.id}
              onClick={() => handleProductDetail(val.id)}
            >
              <div className={classes.card}>
                <div className={classes.card_image}>
                  <img src={val.image} />
                </div>
                <div className={classes.card_content}>
                  <h2 className={classes.card_title}>
                    {handleLimitDescription(val.title)}
                  </h2>
                  <p className={classes.card_text}>
                    {handleLimitDescription(val.description)}
                  </p>
                  <div className={classes.card_rating_container}>
                    <div className={classes.card_rating_item}>
                      {val.rating.rate}
                    </div>
                    <div className={classes.card_rating_item}>
                      <Rating
                        initialValue={val.rating.rate.toFixed()}
                        size={20}
                      />
                    </div>
                  </div>
                  <div className={classes.card_price_container}>
                    <div className={classes.card_price_item_1}>
                      ₹ {val.price}
                    </div>
                    <div className={classes.card_price_item_2}>
                      <p
                        className={classes.disabled}
                      >{`M.R.P:${handleOfferPercentage(val.price)}`}</p>
                    </div>
                    <div
                      className={classes.card_price_item_3}
                    >{`(42% off)`}</div>
                    {/* <p className="disabled"></p> */}
                  </div>

                  {/* <button className="btn card_btn">Read More</button> */}
                </div>
              </div>
            </li>
          ))}

        {/* <li className="cards_item">
          <div className="card">
            <div className="card_image">
              <img src="https://picsum.photos/500/300/?image=5" />
            </div>
            <div className="card_content">
              <h2 className="card_title">Card Grid Layout</h2>
              <p className="card_text">
                Demo of pixel perfect pure CSS simple responsive card grid
                layout
              </p>
              <button className="btn card_btn">Read More</button>
            </div>
          </div>
        </li>
        <li className="cards_item">
          <div className="card">
            <div className="card_image">
              <img src="https://picsum.photos/500/300/?image=11" />
            </div>
            <div className="card_content">
              <h2 className="card_title">Card Grid Layout</h2>
              <p className="card_text">
                Demo of pixel perfect pure CSS simple responsive card grid
                layout
              </p>
              <button className="btn card_btn">Read More</button>
            </div>
          </div>
        </li>
        <li className="cards_item">
          <div className="card">
            <div className="card_image">
              <img src="https://picsum.photos/500/300/?image=14" />
            </div>
            <div className="card_content">
              <h2 className="card_title">Card Grid Layout</h2>
              <p className="card_text">
                Demo of pixel perfect pure CSS simple responsive card grid
                layout
              </p>
              <button className="btn card_btn">Read More</button>
            </div>
          </div>
        </li>
        <li className="cards_item">
          <div className="card">
            <div className="card_image">
              <img src="https://picsum.photos/500/300/?image=17" />
            </div>
            <div className="card_content">
              <h2 className="card_title">Card Grid Layout</h2>
              <p className="card_text">
                Demo of pixel perfect pure CSS simple responsive card grid
                layout
              </p>
              <button className="btn card_btn">Read More</button>
            </div>
          </div>
        </li>
        <li className="cards_item">
          <div className="card">
            <div className="card_image">
              <img src="https://picsum.photos/500/300/?image=2" />
            </div>
            <div className="card_content">
              <h2 className="card_title">Card Grid Layout</h2>
              <p className="card_text">
                Demo of pixel perfect pure CSS simple responsive card grid
                layout
              </p>
              <button className="btn card_btn">Read More</button>
            </div>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default Shop;
