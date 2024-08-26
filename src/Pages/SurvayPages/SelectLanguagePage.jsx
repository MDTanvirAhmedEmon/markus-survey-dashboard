import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SelectLanguagePage() {
    const { i18n } = useTranslation();
    const nevigate = useNavigate();

    const handleLanguageChange = (lang) => {
        // i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        nevigate("/surveyQuestions");
    };

    // Load language from local storage or default to 'de'
    React.useEffect(() => {
        const savedLang = localStorage.getItem("language");
        if (savedLang) {
            i18n.changeLanguage(savedLang);
        } else {
            i18n.changeLanguage("de");
        }
    }, [i18n]);

    return (
        <div className="bg-[#fdfdfd] container mx-auto mt-60">
            <h1 className="text-center font-semibold text-[#ecb206] text-4xl">
                Select Language
            </h1>
            <div className="flex justify-center my-10 items-center">
                <div className="flex gap-5 justify-center items-center border-2 rounded-3xl py-2 px-3 border-[#ecb206]">
                    <button
                        className={`py-1 px-3 ${i18n.language === "de" ? "font-bold text-[#ecb206]" : ""
                            }`}
                        onClick={() => handleLanguageChange("de")}
                    >
                        DE
                    </button>
                    <button
                        className={`py-1 px-3 ${i18n.language === "en" ? "font-bold text-[#ecb206]" : ""
                            }`}
                        onClick={() => handleLanguageChange("en")}
                    >
                        ENG
                    </button>
                </div>
            </div>
        </div>
    );
}