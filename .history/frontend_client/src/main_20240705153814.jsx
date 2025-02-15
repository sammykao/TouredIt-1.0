import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/css/tailwind.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./config";
import { Cr}

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Auth0Provider
          {...providerConfig}
        >
          <App />
        </Auth0Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

