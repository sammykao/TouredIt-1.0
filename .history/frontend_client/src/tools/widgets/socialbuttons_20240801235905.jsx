import React, { useEffect } from 'react';

const ShareThisButtons = () => {
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
    <div className="sharethis-inline-share-buttons"></div>
  );
};

export default ShareButtons;
