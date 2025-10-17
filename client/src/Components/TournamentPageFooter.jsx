import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaTrophy } from "react-icons/fa";

function TournamentFooter() {
  return (
    <footer className="bg-[#a14dff] text-white py-8 px-10 mt-10 rounded-t-2xl shadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        
        {/* Logo + Title */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <FaTrophy className="text-yellow-300" />
            <span>Tournament Arena</span>
          </div>
          <p className="text-sm mt-2 text-gray-200">
            Compete. Learn. Win. One challenge at a time.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-200">
            <li><a href="/about" className="hover:text-yellow-300 transition">About</a></li>
            <li><a href="/rules" className="hover:text-yellow-300 transition">Rules</a></li>
            <li><a href="/leaderboard" className="hover:text-yellow-300 transition">Leaderboard</a></li>
            <li><a href="/contact" className="hover:text-yellow-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-4">
          <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <FaInstagram />
          </a>
          <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-sm text-gray-200 mt-6 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} Tournament Arena — All Rights Reserved.
      </div>
    </footer>
  );
}

export default TournamentFooter;
