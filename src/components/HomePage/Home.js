import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import icons from './iconLoader';
import sliderPhotos from './sliderLoader';

const Home = () => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Time between each slide in milliseconds
    centerMode: true,
    centerPadding: '0', // Adjust if needed
  };

  return (
    <div className="homepage-container">
      <div className="homepage-slider">
        <Slider {...sliderSettings}>
          {sliderPhotos.map((photo) => (
            <div >
              <img src={photo} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="welcome-message">
        <h1>Welcome to Heavenly Horizon Beauty Salon & Spa</h1>
        <h2>Your Oasis of Relaxation and Beauty</h2>
      </div>

      <div className="services">
        <div className="salon-services">
          <img className="services-icon" src={icons[3]} />
          <h3>Salon Services</h3>
          <p>Our talented and educated artists meet the unique needs of every client so you feel refreshed and feel your best.</p>
        </div>

        <div className="spa-services">
        <img className="services-icon" src={icons[2]} />
        <h3>Spa Services</h3>
        <p>Our skilled estheticians offer a selection of relaxing treatments, leaving you feeling rejuvenated, restored, and pampered.</p>
        </div>

        <div className="massage-services">
        <img className="services-icon" src={icons[0]} />
        <h3>Massage</h3>
        <p>Our registered massage therapists offer both therapeutic and relaxation massages for you to choose from.</p>
        </div>
      </div>

      <div className="contact-us">
        <h2>Contact Us!</h2>
        <p>Ready to experience the ultimate in beauty and relaxation?</p>
        <p>Signup now to book an appointment or contact us to ask any questions you may have.</p>
        <img className="contact-icon" src={icons[1]} onClick={() => window.location.href = 'mailto:shanny.assa@gmail.com'}></img>
      </div>
      
      <footer>
        <p>&copy; 2024 Heavenly Horizon Beauty Salon & Spa. All rights reserved.</p>
      </footer>

    </div>
    );
}
 
export default Home;