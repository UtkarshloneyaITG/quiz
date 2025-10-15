import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  // i18next-http-backend को लोड करता है (ट्रांसलेशन फ़ाइलें लोड करने के लिए)
  .use(Backend)
  // यूज़र के ब्राउज़र की भाषा डिटेक्ट करता है
  .use(LanguageDetector)
  // React में useTranslation हुक और अन्य कंपोनेंट को जोड़ने के लिए
  .use(initReactI18next)

  // i18next को इनिशियलाइज़ (initialize) करता है
  .init({
    // अगर कोई ट्रांसलेशन मिसिंग हो, तो 'en' (English) को फ़ॉलबैक भाषा के रूप में उपयोग करें
    fallbackLng: "en",

    // डेवलपमेंट के दौरान डीबगिंग (Debugging) चालू करें
    debug: true,

    // React XSS से खुद बचाता है, इसलिए interpolation वैल्यू एस्केपिंग की ज़रूरत नहीं है
    interpolation: {
      escapeValue: false,
    },

    // 👇 Content as Keys (हर शब्द के लिए अलग कुंजी न बनाने) के लिए महत्वपूर्ण सेटिंग्स
    // यह सुनिश्चित करता है कि पूरा वाक्य ही कुंजी माना जाए।
    keySeparator: true, // कुंजी में डॉट ('.') को नेस्टिंग (nesting) सेपरेटर के रूप में उपयोग न करें
    nsSeparator: true, // नामस्थान (namespace) सेपरेटर का उपयोग न करें

    // ट्रांसलेशन फ़ाइलों का पथ (Path) सेट करता है
    backend: {
      // यह public/locales/en/translation.json जैसी फ़ाइलों को लोड करेगा
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
