import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { TASK_TRACKER_TITLE, CALCULATE_TITLE, VIDEO_GALLERY, SHOPPING_CART, } from "../const";
import './Styles/HomeComponent.scss'

const HomeComponent = () => {
    let baseCls = "home";
    const navigate = useNavigate();
    const renderCalculateIcon = () => {
        return (
            <div className={`${baseCls}__icon-item`}>
                <CalculateIcon classes={`${baseCls}__icon`}  fontSize='large'/>
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

    const renderTaskIcon = () => {
        return (
            <div className={`${baseCls}__icon-item`}>
                <AssignmentIcon classes={`${baseCls}__icon`} fontSize='large'/>
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
         <div className={`${baseCls}__item`} onClick={() => handleComponentRedirect("/task")}>
            {renderTaskIcon()}
            <h3>{ TASK_TRACKER_TITLE }</h3>
        </div>
        <div className={`${baseCls}__item`} onClick={() => handleComponentRedirect("/emicalculator")}>
            {renderCalculateIcon()}
            <h3>{ CALCULATE_TITLE }</h3>
        </div>
        <div className={`${baseCls}__item`} onClick={() => handleComponentRedirect("/videogallery")}>
            {renderVideoGalleryIcon()}
            <h3>{ VIDEO_GALLERY }</h3>
        </div>
        <div className={`${baseCls}__item`} onClick={() => handleComponentRedirect("/product")}>
            {renderShoppingCartIcon()}
            <h3>{ SHOPPING_CART }</h3>
        </div>
    </div>
  )
}

export default HomeComponent;