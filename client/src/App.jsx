import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Divider from "./components/Divider";
import AIAssistant from "./components/AIAssistant";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f0f1a" }}>
      <Navbar />
      <Hero />
      <Divider />
      <AIAssistant />
      <Footer />
    </div>
  );
}
