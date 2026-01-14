import logo from "./assets/nobg.png";
import { FaXTwitter, FaInstagram, FaGithub } from "react-icons/fa6";

function App() {
  return (
    <div
      className="min-h-screen flex flex-col justify-between px-4 font-bold"
      style={{
        backgroundImage: "url(/src/assets/bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pt-4">
        <img
          src={logo}
          alt="Bizxflow Logo"
          className="w-70 h-70 mx-auto"
          style={{ imageRendering: "crisp-edges" }}
        />
      </div>

      <div className="text-center text-white max-w-3xl mx-auto">
        <h2
          className="text-5xl font-bold mb-6"
          style={{ fontFamily: "PolySans-neutral, sans-serif" }}
        >
          Launching Soon
        </h2>

        <p
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: "PolySans-neutral, sans-serif" }}
        >
          Complete AI-Powered Business Management System
        </p>

        <p
          className="text-lg mb-12 leading-relaxed opacity-55"
          style={{ fontFamily: "PolySans-neutral, sans-serif" }}
        >
          Transform your retail operations with intelligent insights. Sales
          tracking, inventory management, employee scheduling, and customer
          analytics - powered by AI, simplified for small businesses.
        </p>

        <button
          className="bg-white text-[#6B9FED] px-12 py-4 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-all"
          style={{ fontFamily: "PolySans-neutral, sans-serif" }}
        >
          Join Waitlist
        </button>
      </div>

      <div className="pb-4">
        <div className="flex justify-center gap-2 mb-4 text-xl mx-auto w-fit">
          <a
            href="https://twitter.com/bizxflow"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity p-3 rounded-lg"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <FaXTwitter className="text-white" />
          </a>
          <a
            href="https://instagram.com/bizxflowio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity p-3 rounded-lg"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <FaInstagram className="text-white" />
          </a>
          <a
            href="https://github.com/bizxflowio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity p-3 rounded-lg"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <FaGithub className="text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
