import React from 'react';
import { useAudio } from '../context/AudioContext';
import { homeConfig } from '../config/homeConfig';

export const AudioControls: React.FC = () => {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <div className="fixed bottom-8 right-8 flex flex-col-reverse md:flex-row items-end md:items-center md:space-x-4">
      {/* CD Image with Rotation */}
      <div className={`relative w-12 h-12 md:w-16 md:h-16 mt-4 md:mt-0 ${isPlaying ? 'cd-spin playing' : 'cd-spin'}`}>
        <img
          src={homeConfig.controls.styles.cdImage.src}
          alt={homeConfig.controls.styles.cdImage.alt}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={toggleAudio}
        className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
      >
        {isPlaying ? (
          <svg className="w-8 h-8 md:w-12 md:h-12 text-gray-800 fill-current" viewBox="0 0 24 24">
            <rect x="7" y="5" width="3" height="14" rx="1.5" />
            <rect x="14" y="5" width="3" height="14" rx="1.5" />
          </svg>
        ) : (
          <svg className="w-8 h-8 md:w-12 md:h-12 text-gray-800 fill-current" viewBox="0 0 24 24">
            <path d="M8.5 5.5c-.3-.2-.6-.2-.9-.1-.3.1-.5.3-.6.5-.1.3-.2.5-.2.8v10.6c0 .3 0 .5.2.8.1.2.3.4.6.5.3.1.6.1.9-.1l8.8-5.3c.2-.1.4-.4.5-.6.1-.3.1-.5 0-.8-.1-.2-.3-.5-.5-.6L8.5 5.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}; 