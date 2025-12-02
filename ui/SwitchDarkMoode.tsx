"use client";

import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const SwitchDarkMoode = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check if dark mode is saved in localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            // Switch to light mode
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            // Switch to dark mode
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-full transition-colors duration-300"
            aria-label="Toggle Dark Mode"
        >
            {isDark ? (
                <MdLightMode size={20} className="text-yellow-400" />
            ) : (
                <MdDarkMode size={20} className="text-blue-300" />
            )}
        </button>
    );
};

export default SwitchDarkMoode;
