import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <div className="contact-card-container">
        {/* Map Card (Left) */}
        <div className="contact-card map-card">
          <div className="card-header">
            <h2>Find Us</h2>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.6822660222047!2d83.35514307425004!3d26.754513666873322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991446b49e31073%3A0x1d54eef9f684bf80!2sD.A.%20V.%20P.G.%20College!5e0!3m2!1sen!2sin!4v1691674454516!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DAV PG College Location"
            ></iframe>
          </div>
        </div>
        
        {/* Contact Details Card (Right) */}
        <div className="contact-card details-card">
          <div className="card-header">
            <h2>Contact Information</h2>
          </div>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="icon-container phone-icon">
                <Phone size={28} />
              </div>
              <div className="contact-text">
                <h3>Phone</h3>
                <p>+91551 3500218</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="icon-container email-icon">
                <Mail size={28} />
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>principaldavpgc@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="icon-container address-icon">
                <MapPin size={28} />
              </div>
              <div className="contact-text">
                <h3>Address</h3>
                <p>
                  DAV PG College, Nasirabad,<br />
                  Buxipur, Gorakhpur 273001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;