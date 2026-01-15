import logo from "./assets/nobg.png";
import { FaXTwitter, FaInstagram, FaGithub } from "react-icons/fa6";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://formspree.io/f/mojjvlyy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setStatus("Thanks! Youre on the waitlist!");
      setEmail("");
    } else {
      setStatus("Error. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between px-4 font-bold"
      style={{
        backgroundImage: "url(/bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pt-">
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
          className="text-md mb-12 leading-relaxed opacity-55 font-light"
          style={{ fontFamily: "PolySans-neutral, sans-serif" }}
        >
          Transform your retail operations with intelligent insights. Sales
          tracking, inventory management, employee scheduling, and customer
          analytics - powered by AI, simplified for small businesses.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center gap-4 mb-8 flex-col sm:flex-row px-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="px-6 py-3 rounded-lg text-white w-80 focus:outline-none w-full sm:w-80 "
            style={{
              fontFamily: "PolySans-neutral, sans-serif",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <button
            type="submit"
            className=" text-white px-12 py-4 rounded-lg text-md font-bold hover:bg-opacity-10 transition-all whitespace-nowrap"
            style={{
              fontFamily: "PolySans-neutral, sans-serif",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            Join Waitlist
          </button>
        </form>
        {status && <p className="text-white mb-4">{status}</p>}
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
