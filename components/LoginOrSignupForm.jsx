import { StytchLogin } from '@stytch/nextjs';
import { Products } from '@stytch/vanilla-js';

const REDIRECT_URL = 'http://localhost:3000/';

export const LoginOrSignupForm = () => {
  const styles = {
    "container": {
      "backgroundColor": "#ffffff",
      "borderColor": "#ff6900",
      "borderRadius": "8px",
      "width": "400px"
    },
    "colors": {
      "primary": "#19303D",
      "secondary": "#5C727D",
      "success": "#0C5A56",
      "error": "#8B1214"
    },
    "buttons": {
      "primary": {
        "backgroundColor": "#000000",
        "textColor": "#FFFFFF",
        "borderColor": "#19303D",
        "borderRadius": "4px"
      },
      "secondary": {
        "backgroundColor": "#FFFFFF",
        "textColor": "#19303D",
        "borderColor": "#19303D",
        "borderRadius": "4px"
      }
    },
    "inputs": {
      "backgroundColor": "#FFFFFF00",
      "borderColor": "#19303D",
      "borderRadius": "4px",
      "placeholderColor": "#8296A1",
      "textColor": "#19303D"
    },
    "fontFamily": "Georgia",
    "hideHeaderText": false,
    "logo": {
      "logoImageUrl": "https://tangram-ui.vercel.app/_next/image?url=%2Ftangram_logo.png&w=64&q=75"
    }
  }

  return <StytchLogin config={{
    products: [
      Products.emailMagicLinks,
      Products.oauth,
      Products.passwords
    ],
    emailMagicLinksOptions: {
      loginRedirectURL: REDIRECT_URL,
      loginExpirationMinutes: 60,
      signupRedirectURL: REDIRECT_URL,
      signupExpirationMinutes: 60,
    },
    oauthOptions: {
      providers: [{
        "type": "google"
      }],
      loginRedirectURL: REDIRECT_URL,
      signupRedirectURL: REDIRECT_URL
    },
    passwordOptions: {
      "loginRedirectURL": REDIRECT_URL,
      "resetPasswordRedirectURL": REDIRECT_URL
    }
  }} styles={styles} />;
}