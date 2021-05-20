import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";
import Content from "components/Content";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Content />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
