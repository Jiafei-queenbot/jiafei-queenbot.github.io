import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Heatmap from "./components/Heatmap";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
            <path d="M0 30C240 0 480 60 720 30 960 0 1200 60 1440 30V60H0V30Z" fill="currentColor" />
          </svg>
        </div>
        <Projects />
        <Gallery />
        <Heatmap />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
