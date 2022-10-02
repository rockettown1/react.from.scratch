import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//FOR CLIENT-SIDE RENDING
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//FOR SERVER SIDE RENDERING
// ReactDOM.hydrateRoot(
//   document.getElementById("root") as HTMLElement,
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
