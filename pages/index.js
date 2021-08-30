import LandingNavbar from "../components/Navbars/LandingNavbar";
import Hero from "../components/Hero";
export default function Landing({feed}) {
  return (
    <div className="flex flex-col w-full h-full">
      <LandingNavbar />
      <div>
        <Hero />
      </div>
    
    </div>
    
  ) 
}
