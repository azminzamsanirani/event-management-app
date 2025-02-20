import "./styles/global.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
// import theme from "./theme";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  </React.StrictMode>
);
