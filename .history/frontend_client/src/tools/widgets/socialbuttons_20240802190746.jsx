import React, { useState, useRef, useEffect } from 'react';
import { InlineShareButtons } from 'sharethis-reactjs';

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
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={toggleShareButtons}
        style={{
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Share
      </button>
      {showButtons && (
        <div
          ref={popupRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '600px',
            height: 'auto',
          }}
          className="responsive-popup"
        >
          <InlineShareButtons config={shareConfig} />
        </div>
      )}
      <style jsx>{`

        @media (max-width: 600px) {
          .responsive-popup {
            width: 90%;
            height: auto;
            padding: 15px;
          }

          button {
            width: 100%;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ShareButtons;
