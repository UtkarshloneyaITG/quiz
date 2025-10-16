import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpne] = useState(false);

  const changeLanguage = (lng = "en") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative flex gap-1  rounded">
      <button onClick={() => setOpne(!open)}>
        <MdLanguage className="text-2xl" />
      </button>
      {open && (
        <div className="top-10 -left-10 z-[9999] absolute bg-white p-2 flex flex-col gap-2 rounded">
          <button
            className={`${
              i18n.language === "en" ? "bg-[#2a1e55]" : "bg-[#b669fa]"
            }   p-1 rounded`}
            onClick={() => changeLanguage("en")}
            disabled={i18n.language === "en"}
          >
            English
          </button>

          <button
            className={`${
              i18n.language === "hi" ? "bg-[#2a1e55]" : "bg-[#b669fa]"
            }   p-1 rounded`}
            onClick={() => changeLanguage("hi")}
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
