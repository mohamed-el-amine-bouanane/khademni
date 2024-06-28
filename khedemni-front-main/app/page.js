import About from "./components/LandigPage/About/About.js";
import Hero from "./components/LandigPage/Hero/Hero.js";
import Reviews from "./components/LandigPage/Reviews/Reviews.js";
import Services from "./components/LandigPage/Services/Services.js";
import Footer from "./components/shared/Footer.js";
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <main >
        <Hero />
        <About /> 
        <Services />
        <Reviews />
        <Footer/>
    </main>
  );
}
