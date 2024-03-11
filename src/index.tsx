import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssVarsProvider, extendTheme } from "@mui/joy";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const theme = extendTheme({
  fontFamily: {
    display: "Source Sans 3", // applies to `h1`–`h4`
    body: "Source Sans 3", // applies to `title-*` and `body-*`
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
        <App />
      </CssVarsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
