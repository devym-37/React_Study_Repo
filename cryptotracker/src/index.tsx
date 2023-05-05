import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import router from "./Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
