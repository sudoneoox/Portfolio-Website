import React, { useState } from "react";
import Config from "../config";
import Navbar from "./_ui/navbar.tsx";
import "../output.css";

const PortfolioManager = () => {
  const [currentlyActiveItem, setCurrentlyActiveItem] = useState("HOME");

  return <Navbar currentlyActiveItem={currentlyActiveItem} />;
};

export default PortfolioManager;
