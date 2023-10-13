import React, {useState,useRef} from 'react';
import VideoSlider from './VideoSlider';
import { useNavigate } from 'react-router-dom';
import "./Styles/VideoGallery.scss";

const VideoGallery = () => {
    let baseCls = 'video-gallery';
    const videoRef = useRef(null);
    const [ toggle, setToggle ] = useState(false);
    const Navigate = useNavigate();

    const VideoDatas = [
        {
            id: 1,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            content: "The mountains are calling",
            title: "North Cascades"
        },
        {   
            id: 2,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            content: "14410 feet of adventure",
            title: "Mt. Rainier"
        },
        {
            id: 3,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            content: "Mountains, rain forests, wild coastlines",
            title: "Olympic National Park"
        },
        {
            id: 4,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            content: "The one and only",
            title: "Mount St. Helens"
        },
        {
            id: 5,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            content: "Mountains, rain forests, wild coastlines",
            title: "North Cascades"
        },
        {
            id: 6,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            content: "By Google",
            title: "For Bigger Joyrides"
        },
        {
            id: 7,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            content: "Mountains, rain forests, wild coastlines",
            title: "North Cascades"
        },
        {
            id: 8,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            content: "By Blender Foundation",
            title: "Sintel"
        },
        {
            id: 5,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            content: "By Garage419",
            title: "Subaru Outback On Street And Dirt"
        }
    ]



    // $(document).ready(function() {
    //     $('.video-gallery').magnificPopup({
    //     delegate: 'a', 
    //     type: 'iframe',
    //     gallery:{
    //       enabled:true
    //     }
    //   });
    //   });

    document.addEventListener('DOMContentLoaded', function() {
        const videoGallery = document.querySelectorAll('.video-gallery a');
      
        if (videoGallery) {
          videoGallery.forEach(function(videoLink) {
            videoLink.addEventListener('click', function(event) {
              event.preventDefault(); // Prevent the default link behavior
      
              // Open the video in a popup
              const videoUrl = this.getAttribute('href');
              const options = {
                type: 'iframe',
              };
      
              window.magnificPopup.open({
                items: {
                  src: videoUrl,
                },
                type: 'iframe',
              });
            });
          });
        }
      });
      

    const handleRedirectSlider = (id) => {
        console.log('click!')
        Navigate(`/${id}`)
        setToggle(true);
    }


    const renderVideoDatas = () => {
        return (
            <div className={`${baseCls}__video-container`}>
            <div class="content">
                <h1 class="section-header">Video Gallery</h1>
                <div class="section-header-underline"></div>
                
                    <div class="video-gallery">
                    {VideoDatas.map((val) => (
                    <div class="gallery-item" onClick={() => handleRedirectSlider(val?.id)}>
                    <video id={`video${val.id}`} controls muted onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} >
                            <source src={val.url} type="video/mp4" />
                        </video>
                    <div class="gallery-item-caption">
                        <div>
                        <h2>{val.title}</h2>
                        <p>{val.content}</p>
                        </div>
                    </div>
                    </div>
))}
                </div>
                
                </div>
            </div>
        )
    }


  return (
    <div className={`${baseCls}__container`}>
        {renderVideoDatas()}
        {toggle && <VideoSlider VideoDatas={VideoDatas} toggle={toggle} setToggle={setToggle}/>}
            
    </div>
  )
}

export default VideoGallery;