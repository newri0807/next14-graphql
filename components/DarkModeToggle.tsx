"use client";

import React from "react";
import {useTheme} from "@/context/ThemeContext";
import {MdSunny} from "react-icons/md";
import {FaRegMoon} from "react-icons/fa";

export const DarkModeToggle: React.FC = () => {
    const {darkMode, toggleDarkMode} = useTheme();

    return (
        <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                darkMode
                    ? "bg-gray-800 text-yellow-300 hover:bg-gray-700 focus:ring-yellow-500"
                    : "bg-yellow-100 text-gray-800 hover:bg-yellow-200 focus:ring-yellow-500"
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="relative w-6 h-6">
                <MdSunny
                    className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                        darkMode ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                    size={24}
                />
                <FaRegMoon
                    className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                        darkMode ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                    size={24}
                />
            </div>
        </button>
    );
};
