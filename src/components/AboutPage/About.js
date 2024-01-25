import React from 'react';
import './About.css';
import yarin from '../../resources/aboutPhotos/yarin.jpg';
import yaron from '../../resources/aboutPhotos/yaron.jpg';
import yanir from '../../resources/aboutPhotos/yanir.jpg';
import roni from '../../resources/aboutPhotos/roni.jpg';


const About = () => {
  return (
    <div className="about-container">
      <h2> About Us </h2>
      <h3>Welcome to Heavenly Horizon Beauty Salon & Spa</h3>
      <p>
        Where serenity meets style! Our spa, a hidden gem in the heart of tranquility, invites you to experience beauty and relaxation like never before. Meet our talented team, led by the visionary Dr. Yarin Binyamini, and let us whisk you away to a world where timeless traditions and modern therapies dance in perfect harmony.
      </p>

      <h3>Meet Our Team</h3>

      <div className="team-member">
        <img src={yarin} alt="Dr. Yarin Binyamini" />
        <div className="member-text">
          <h3>Dr. Yarin Binyamini - CEO and Naimi Therapist</h3>
          <p>
            Dr. Yarin, our inspiring CEO, doubles as a 'Naimi' therapist, infusing every treatment with a touch of holistic wellness. His passion ensures that your visit is not just about looking good but feeling harmonized from within.
          </p>
        </div>
      </div>

      <div className="team-member">
        <img src={yaron} alt="Yaron" />
        <div className="member-text">
          <h3>Yaron - Skin Wellness Specialist</h3>
          <p>
            Yaron, our skin wellness expert, specializes in advanced acne treatments, promising you a radiant complexion. Embrace a new level of confidence as he combines traditional care with the latest in skincare innovations.
          </p>
        </div>
      </div>

      <div className="team-member">
        <img src={yanir} alt="Yanir" />
        <div className="member-text">
          <h3>Yanir - Radiance Maestro</h3>
          <p>
            Yanir, our facial specialist, crafts personalized sessions using cutting-edge techniques. Revel in the transformative power of an advanced facial, leaving your skin glowing and refreshed.
          </p>
        </div>
      </div>

      <div className="team-member">
        <img src={roni} alt="Roni" />
        <div className="member-text">
          <h3>Roni - Massage Virtuoso</h3>
          <p>
            Roni, our massage maestro, offers a symphony of techniques to soothe your body and mind. From relaxation to rejuvenation, let Roni's expert touch transport you to a realm of pure bliss.
          </p>
        </div>
      </div>
    </div>
    );
}
 
export default About;