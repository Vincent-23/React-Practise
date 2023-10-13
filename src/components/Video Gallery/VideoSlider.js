import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Styles/VideoSlider.scss';

const VideoSlider = ({ VideoDatas, toggle, setToggle }) => {
    let baseCls = "video-slider";
    
    const { id } = useParams();
    const [ sliderIndex, setSliderIndex ] = useState(0);
    const [ sliderData, setSliderDatas ] = useState([]);
    const handleOpen = () => setToggle(true);
    const handleClose = () => setToggle(false);

    useEffect(() => {
        setSliderIndex(id);
        setSliderDatas(VideoDatas);
    },[id])

    useEffect(() => {
        let filterData = VideoDatas.filter((val, ind) => ind === sliderIndex)[0];
        setSliderDatas(filterData);
    },[sliderIndex])

console.log("slider!",sliderData?.url,sliderData,sliderIndex)
    const renderBackArrow = () => {
        return (
            <div className={`${baseCls}__container`}>
                <div className={`${baseCls}__item-icon`}>
                        <ArrowBackIcon />
                </div>
            </div>
        )
    }

    const renderForwardArrow = () => {
        return (
            <div className={`${baseCls}__container`}>
                <div className={`${baseCls}__item-icon`}>
                        <ArrowForwardIcon />
                </div>
            </div>
        )
    }

    const handleBackVideo = () => {
        setSliderIndex((prevIndex) => (prevIndex - 1 + VideoDatas?.length) % VideoDatas?.length);
       
    }

    const handleForwardVideo = () => {
        setSliderIndex((prevIndex) => (prevIndex + 1) % VideoDatas?.length);

    }


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'transparent',
//   border: '2px solid #000',
//   boxShadow: 24,
  p: 4,
};

const Slider = () => {
    return (
    <div className={`${baseCls}__pop-video-container`}>
            <div className={`${baseCls}__pop-video-left-btn`} onClick={(() => handleBackVideo(id))}>
            {renderBackArrow()}
            </div>
            <div className={`${baseCls}__pop-video-item`}>
                <video width="900" height="400" controls autoPlay>
                    <source src={VideoDatas[parseInt(sliderIndex)]?.url} type="video/mp4" />
                    {VideoDatas[parseInt(sliderIndex)]?.content}
                </video>
            </div>
            <div className={`${baseCls}__pop-video-right-btn`} onClick={() => handleForwardVideo(id)}>
                {renderForwardArrow()}
            </div>
            
    </div>
    )
}

    
console.log('test!',VideoDatas[parseInt(sliderIndex)]?.url,parseInt(sliderIndex))
    return (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={toggle}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={toggle}>
              <Box sx={style}>
                <Slider />
              </Box>
            </Fade>
          </Modal>
        </div>
  )
}

export default VideoSlider;