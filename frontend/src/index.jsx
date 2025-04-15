/*import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);*/

// index.jsx
import { createRoot } from "react-dom/client";
import App from "./App";  // Importen ska nu fungera

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);
