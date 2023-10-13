import * as React from 'react';
import CalculateIcon from '@mui/icons-material/Calculate';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Layout from './Layout';
import './Styles/HomeComponent.scss'
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
    let baseCls = "home";
    const navigate = useNavigate();
    const styles = {

        largeIcon: {
          width: 150,
          height: 60,
        },
      
      };
    const renderCalculateIcon = () => {
        return (
            <div className={`${baseCls}__icon-item`}>
                {/* <IconButton aria-label="Example" size='large' classes={styles.largeIcon}> */}
                    <CalculateIcon classes={`${baseCls}__icon`}  fontSize='large'/>
                {/* </IconButton> */}
            </div>
        )
    }

    const renderVideoGalleryIcon = () => {
        return (
            <div className={`${baseCls}__icon-item`}>
                <PlayCircleIcon classes={`${baseCls}__icon`} fontSize='large'/>
            </div>
        )
    }

    const renderShoppingCartIcon = () => {
        return (
            <div className={`${baseCls}__icon-item`}>
                <ShoppingCartIcon classes={`${baseCls}__icon`} fontSize='large'/>
            </div>
        )
    }

    const handleComponentRedirect = (route) => {
        navigate(route);
    }

  return (
    <div className={`${baseCls}__container`}>
        <div className={`${baseCls}__item`} onClick={() => handleComponentRedirect("/emicalculator")}>
            {renderCalculateIcon()}
            <h3>Calculate</h3>
        </div>
        <div className={`${baseCls}__item`} onClick={() => handleComponentRedirect("/videogallery")}>
            {renderVideoGalleryIcon()}
            <h3>Video Gallery</h3>
        </div>
        <div className={`${baseCls}__item`}>
            {renderShoppingCartIcon()}
            <h3>Shopping Cart</h3>
        </div>
    </div>
  )
}








export default HomeComponent;