import LandingNavbar from "../components/Navbars/LandingNavbar";
import Hero from "../components/Hero";
export default function Landing() {

  return (
    <div className="flex flex-col w-full">
      <LandingNavbar />
      <div>
        <Hero />
      </div>
    
    </div>
    
  ) 
}
