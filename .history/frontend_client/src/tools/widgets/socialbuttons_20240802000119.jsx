import React, { useEffect } from 'react';

const ShareButtons = () => {
  useEffect(() => {
    // Load ShareThis script
    const script = document.createElement('script');
    script.src = "https://platform-api.sharethis.com/js/sharethis.js#property=66ac56d0e1507500197b04d2&product=inline-share-buttons&source=platform";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <InlineShareButtons
        config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'cta',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
                'email',
                'sms',
                'wechat',
                'facebook',
                'linkedin',
                'reddit',
                'messenger',
                
                'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: true,
            size: 32            // the size of each button (INTEGER)
        }}
    />
  );
};

export default ShareButtons;
