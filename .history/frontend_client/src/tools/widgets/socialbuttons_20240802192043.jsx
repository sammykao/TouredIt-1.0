import React, { useState, useRef, useEffect } from 'react';
import { InlineShareButtons } from 'sharethis-reactjs';
import { ShareIcon } from '@heroicons/react/24/solid';

const ShareButtons = ({ school }) => {
  const [showButtons, setShowButtons] = useState(false);
  const popupRef = useRef(null);

  const toggleShareButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowButtons(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const desc = `Find guides at ${school}`;
  const shareConfig = {
    alignment: 'center',
    color: 'social',
    enabled: true,
    font_size: 16,
    labels: 'cta',
    language: 'en',
    networks: [
      'sms',
      'wechat',
      'facebook',
      'whatsapp',
      'email',
      'linkedin',
      'messenger',
      'twitter',
      'reddit',
    ],
    padding: 4,
    radius: 8,
    show_total: false,
    size: 32,
    title: school,
    description: desc,
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleShareButtons}
        className="flex items-center p-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <ShareIcon className="w-5 h-5 mr-2" /> Share
      </button>
      {showButtons && (
        <div
          ref={popupRef}
          className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 bg-white p-5 rounded-md shadow-lg w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl"
        >
          <InlineShareButtons config={shareConfig} />
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
