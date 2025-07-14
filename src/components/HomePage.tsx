import React, { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { DateTime } from 'luxon';
import { homeConfig } from '../config/homeConfig';
import { AudioControls } from './AudioControls';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(DateTime.utc().setZone('Africa/Cairo'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.utc().setZone('Africa/Cairo'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (dateTime: DateTime) => {
    return dateTime.toFormat("MM/dd/yyyy  ·  hh:mm a 'Cairo'");
  };

  return (
    <div className={homeConfig.layout.container}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className={homeConfig.backgroundVideo.styles.container}
        style={{ filter: homeConfig.backgroundVideo.styles.brightness }}
      >
        <source src={homeConfig.backgroundVideo.src} type={homeConfig.backgroundVideo.type} />
      </video>

      {/* Content */}
      <div className={homeConfig.layout.content}>
        {/* Logo */}
        <button 
          onClick={() => onNavigate('shop')}
          className="mb-4 cursor-pointer transition-opacity duration-300 hover:opacity-80"
        >
          <img 
            src={homeConfig.logo.src}
            alt={homeConfig.logo.alt}
            className={homeConfig.logo.width}
          />
        </button>
        
        <div className={homeConfig.dateTime.styles.container}>
          {formatDateTime(currentTime)}
        </div>

        <nav className={homeConfig.navigation.styles.container}>
          {homeConfig.navigation.links.map((link) => (
            <button 
              key={link.route}
              onClick={() => onNavigate(link.route)}
              className={homeConfig.navigation.styles.button}
            >
              {link.text}
            </button>
          ))}
        </nav>

        <div className={homeConfig.socialLinks.styles.container}>
          {homeConfig.socialLinks.icons.map((icon) => (
            <a key={icon.type} href={icon.url} target="_blank" rel="noopener noreferrer">
              {icon.type === 'instagram' ? (
                <Instagram className={homeConfig.socialLinks.styles.icon} />
              ) : (
                <svg className={homeConfig.socialLinks.styles.icon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0011.14-4.02v-7a8.16 8.16 0 004.65 1.48V7.1a4.79 4.79 0 01-1.2-.41z"/>
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* Audio Controls */}
        <AudioControls />
      </div>
    </div>
  );
};

export default HomePage;