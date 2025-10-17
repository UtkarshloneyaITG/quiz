import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false); // close dropdown on selection
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition-all"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <MdLanguage className="text-xl text-purple-600" />
        <span className="hidden md:inline">Language</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in-down">
          <button
            onClick={() => changeLanguage("en")}
            className={`w-full px-4 py-2 text-left text-sm rounded-t-md transition-colors duration-150 ${
              i18n.language === "en"
                ? "bg-purple-600 text-white cursor-not-allowed"
                : "hover:bg-purple-600 text-black"
            }`}
            disabled={i18n.language === "en"}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("hi")}
            className={`w-full px-4 py-2 text-left text-sm rounded-b-md transition-colors duration-150 ${
              i18n.language === "hi"
                ? "bg-purple-600 text-white cursor-not-allowed"
                : "hover:bg-purple-600 text-black"
            }`}
            disabled={i18n.language === "hi"}
          >
            हिन्दी
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
