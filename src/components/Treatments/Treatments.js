import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './Treatments.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Element } from 'react-scroll';
import treatmentPhotos from './photosLoader';



const Treatments = ({domain}) => {
  const [treatments, setTreatments] = useState([]);
  const [showAllTreatments, setShowAllTreatments] = useState(false);
  const [showAllTreatmentsButton, setShowAllTreatmentsButton] = useState("Show all treatments");
  const serverBaseURL = '/treatmentsPhotos/';
  const sliderRef = useRef(null);
  
  // Treatments Fetching
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get(`${domain}/treatments`);
        setTreatments(response.data);
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    fetchTreatments();
  }, []);

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500, // Transition speed in milliseconds
    autoplay: true,
    autoplaySpeed: 2000, // Time between each slide in milliseconds
    centerMode: true,
    centerPadding: '0', // Adjust if needed
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const treatmentSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 10000,
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleClicked = () => {

    if(showAllTreatments) {
      setShowAllTreatments(false);
      setShowAllTreatmentsButton("Show all treatments");
    }
    else {
      setShowAllTreatments(true);
      setShowAllTreatmentsButton("Show Treatments Map & Slider");
    }

  }

  const scrollToTreatment = (treatmentIndex) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(treatmentIndex);
    }
  };

  return (
    <div className="treatments-page">
      <button className="show-all-treatments-button" onClick={handleClicked}>
        {showAllTreatmentsButton}
      </button>
  
      {treatments.length > 0 ? (
        showAllTreatments ? (
          treatments.map((treatment, treatmentIndex) => (
            <div key={treatment._id} className="treatment-card">
              <h3 className="treatment-name">{treatment.name}</h3>
              <p className="treatment-category">Description: </p>
              <p className="treatment-content">{treatment.description}</p>
              <p className="treatment-category">Price: </p>
              <p className="treatment-content">{treatment.price}</p>
              <p className="treatment-category">Number of Appointments: </p>
              <p className="treatment-content">{treatment.numberOfAppointments}</p>
              <p className="treatment-category">Duration (minutes): </p>
              <p className="treatment-content">{treatment.durationMinutes}</p>
              <Slider {...slickSettings}>
                {treatment.images.map((image, index) => (
                  <div key={index}>
                    {console.log('treatment image', image)}
                    <img src={treatmentPhotos[image]} /*alt={`Treatment ${treatmentIndex + 1} Image ${index + 1}`}*/ />
                  </div>
                ))}
              </Slider>
            </div>
          ))
        ) : (
          <div className="treatment-slide-container">
              <div className="treatment-map-container">
                {treatments.map((treatment, index) => (
                  <div
                    key={treatment._id}
                    className="treatment-map-item"
                    onClick={() => scrollToTreatment(index)}
                  >
                    {treatment.name}
                  </div>
                ))}
              </div>

            <Slider ref={sliderRef} {...treatmentSliderSettings}>
              {treatments.map((treatment, treatmentIndex) => (
                 <Element name={`treatment-${treatmentIndex}`} key={treatment._id}>
                    <div key={treatment._id} className="treatment-card">
                      <h3 className="treatment-name">{treatment.name}</h3>
                      <p className="treatment-category">Description: </p>
                      <p className="treatment-content">{treatment.description}</p>
                      <p className="treatment-category">Price: </p>
                      <p className="treatment-content">{treatment.price}</p>
                      <p className="treatment-category">Number of Appointments: </p>
                      <p className="treatment-content">{treatment.numberOfAppointments}</p>
                      <p className="treatment-category">Duration (minutes): </p>
                      <p className="treatment-content">{treatment.durationMinutes}</p>
                      <Slider {...slickSettings}>
                        {treatment.images.map((image, index) => (
                          <div key={index}>
                            <img src={treatmentPhotos[image]} />
                          </div>
                        ))}
                      </Slider>
                  </div>
                 </Element>
              ))}
            </Slider>
          </div>
        )
      ) : (
        <p className="no-treatments-p">There are no available treatments to show at this moment</p>
      )}
    </div>
  );
}
 
export default Treatments;