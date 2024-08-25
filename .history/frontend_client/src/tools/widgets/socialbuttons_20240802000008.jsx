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
                'whatsapp',
                'linkedin',
                'messenger',
                'facebook',
                'twitter'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            show_total: true,
            size: 40,             // the size of each button (INTEGER)


        // OPTIONAL PARAMETERS

            min_count: 10,                    // (threshold for total share count to be displayed)
            url: 'https://www.sharethis.com', // (defaults to current url)
            image: 'https://bit.ly/2CMhCMC',  // (defaults to og:image or twitter:image)
            description: 'custom text',       // (defaults to og:description or twitter:description)
            title: 'custom title',            // (defaults to og:title or twitter:title)
            message: 'custom email text',     // (only for email sharing)
            subject: 'custom email subject',  // (only for email sharing)
            username: 'custom twitter handle' // (only for twitter sharing)
        }}
    />
  );
};

export default ShareButtons;
