import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {

    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-1  rounded">
      <button
        className={`${i18n.language === "en" ? "bg-[#b669fa]" : ""}   p-1 rounded`}
        onClick={() => changeLanguage("en")}
        disabled={i18n.language === "en"}
      >
        English
      </button>
      /
      <button
       className={`${i18n.language === "hi" ? "bg-[#b669fa]" : ""}   p-1 rounded`}
        onClick={() => changeLanguage("hi")}
        disabled={i18n.language === "hi"}
      >
        हिन्दी
      </button>
    </div>
  );
}

export default LanguageSwitcher;
