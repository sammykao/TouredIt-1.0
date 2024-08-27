import {InlineShareButtons} from 'sharethis-reactjs';

const ShareButtons = () => {

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
                'messenger',
                'twitter',
                reddit',
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