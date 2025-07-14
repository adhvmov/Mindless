import React from 'react';
import { newsTickerConfig } from '../config/newsTickerConfig';

interface NewsTickerProps {
  onNavigate: (page: string) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ onNavigate }) => {
  // Double the announcements to create a seamless loop
  const announcements = [...newsTickerConfig.announcements, ...newsTickerConfig.announcements];
  
  return (
    <div className={newsTickerConfig.styles.container}>
      <div className={newsTickerConfig.styles.ticker}>
        {announcements.map((announcement, index) => (
          <button
            key={index}
            onClick={() => onNavigate(announcement.link)}
            className={newsTickerConfig.styles.link}
          >
            {announcement.text}
          </button>
        ))}
      </div>
    </div>
  );
}; 