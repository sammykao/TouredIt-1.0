import React, { useState } from 'react';
import { InlineShareButtons } from 'sharethis-reactjs';

const ShareButtons = () => {
  const [showButtons, setShowButtons] = useState(false);

  const toggleShareButtons = () => {
    setShowButtons(!showButtons);
  };

  const shareConfig = {
    alignment: 'center',  // alignment of buttons (left, center, right)
    color: 'social',      // set the color of buttons (social, white)
    enabled: true,        // show/hide buttons (true, false)
    font_size: 16,        // font size for the buttons
    labels: 'cta',        // button labels (cta, counts, null)
    language: 'en',       // which language to use (see LANGUAGES)
    networks: [           // which networks to include (see SHARING NETWORKS)
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
    padding: 4,           // padding within buttons (INTEGER)
    radius: 8,            // the corner radius on each button (INTEGER)
    show_total: false,
    size: 32,             // the size of each button (INTEGER)
    // Adding URL and Title
    title: 'Your Custom Title',   // the title of the shared link
    description: 'Your custom description here', // the description of the shared link
    image: 'https://yourlink.com/image.jpg' // image for the shared link
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggleShareButtons} style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Share
      </button>
      {showButtons && (
        <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <InlineShareButtons config={shareConfig} />
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
