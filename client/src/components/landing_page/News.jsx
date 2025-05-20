import React, { useState, useEffect } from 'react';
import './styles/News.css';
import p2 from '../images/p2.webp';
import p4 from '../images/p4.webp';
import backImg from '../images/back.webp';
import newIcon from '../images/new.webp';

const News = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  const profiles = [
    { name: "Prof. Shail Pande", role: "Principal", image: p4 },
    { name: "Ranvir Shanker", role: "Manager", image: p2 }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchNewsAndEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/news/viewallnews');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Assuming 'send' contains news and 'header_marquee_data' contains events
        // You might need to adjust this based on the exact structure you want to display
        setNews(data.send || []); 
        setEvents(data.header_marquee_data.filter(item => item.Type === "Events") || []); // Filter for events specifically
      } catch (error) {
        console.error("Could not fetch news and events:", error);
      }
    };

    fetchNewsAndEvents();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="nw-news-events-section" style={{ backgroundImage: `url(${backImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="nw-news-events-wrapper">
        {isMobile ? (
          <>
            {/* Mobile View: Headings and content in desired order */}
            <div className="nw-mobile-section nw-mobile-profile-title">
              <h1>Our Leadership</h1>
            </div>
            <div className="nw-mobile-section nw-mobile-profile-items nw-items nw-profile-items">
              <div className="nw-items-body nw-profile-body nw-vertical-cards">
                {profiles.map((profile, index) => (
                  <div key={index} className="nw-profile-card">
                    <div
                      className="nw-profile-avatar"
                      style={{ backgroundImage: `url(${profile.image})` }}
                    />
                    <div className="nw-profile-name">{profile.name}</div>
                    <div className="nw-profile-role">{profile.role}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="nw-mobile-section nw-mobile-news-title">
              <h1>Notices & Circulars</h1>
            </div>
            <div className="nw-mobile-section nw-mobile-news-items nw-items nw-news-items">
              <div className="nw-items-head">
                <p>Latest News</p>
                <hr />
              </div>
              <div className="nw-items-body">
                <div className="nw-movie-credits-container">
                  {news.map((item, index) => (
                    <a key={index} href={item.Link ? `/docs/${item.Link}` : "#"} target="_blank" rel="noopener noreferrer" className="nw-credit-item">
                      <div className="nw-credit-text">
                        <span><img src={newIcon} alt="new" /> {item.Title}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <a href="/viewallnews" className="nw-read-more">Read more</a>
            </div>

            {/* New Events Section for Mobile */}
            <div className="nw-mobile-section nw-mobile-events-title">
              <h1>Upcoming Events</h1>
            </div>
            <div className="nw-mobile-section nw-mobile-events-items nw-items nw-events-items">
              <div className="nw-items-head">
                <p>Upcoming Events</p>
                <hr />
              </div>
              <div className="nw-items-body">
                <div className="nw-movie-credits-container">
                  {events.map((item, index) => (
                    <a key={index} href={item.Link ? `/docs/${item.Link}` : "#"} target="_blank" rel="noopener noreferrer" className="nw-credit-item">
                      <div className="nw-credit-text">
                        <span><img src={newIcon} alt="event" /> {item.Title}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <a href="/viewallevents" className="nw-read-more">Read more</a>
            </div>
          </>
        ) : (
          <>
            {/* Desktop View: Original structure + new Events section */}
            <div className="nw-section-titles-container">
              <div className="nw-section-title nw-news-title">
                <h1>Notices & Circulars</h1>
              </div>
              <div className="nw-section-title nw-profile-title">
                <h1>Our Leadership</h1>
              </div>
              <div className="nw-section-title nw-events-title">
                <h1>Upcoming Events</h1>
              </div>
            </div>
            <div className="nw-news-events-items-row">
              <div className="nw-items nw-news-items">
                <div className="nw-items-head">
                  <p>Latest News</p>
                  <hr />
                </div>
                <div className="nw-items-body">
                  <div className="nw-movie-credits-container">
                    {news.map((item, index) => (
                      <a key={index} href={item.Link ? `/docs/${item.Link}` : "#"} target="_blank" rel="noopener noreferrer" className="nw-credit-item">
                        <div className="nw-credit-text">
                          <span><img src={newIcon} alt="new" /> {item.Title}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <a href="/viewallnews" className="nw-read-more">Read more</a>
              </div>
              <div className="nw-items nw-profile-items">
                <div className="nw-items-body nw-profile-body nw-vertical-cards">
                  {profiles.map((profile, index) => (
                    <div key={index} className="nw-profile-card">
                      <div
                        className="nw-profile-avatar"
                        style={{ backgroundImage: `url(${profile.image})` }}
                      />
                      <div className="nw-profile-name">{profile.name}</div>
                      <div className="nw-profile-role">{profile.role}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* New Events Section for Desktop */}
              <div className="nw-items nw-events-items">
                <div className="nw-items-head">
                  <p>Upcoming Events</p>
                  <hr />
                </div>
                <div className="nw-items-body">
                  <div className="nw-movie-credits-container">
                    {events.map((item, index) => (
                      <a key={index} href={item.Link ? `/docs/${item.Link}` : "#"} target="_blank" rel="noopener noreferrer" className="nw-credit-item">
                        <div className="nw-credit-text">
                          <span><img src={newIcon} alt="event" /> {item.Title}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <a href="/viewallevents" className="nw-read-more">Read more</a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default News;