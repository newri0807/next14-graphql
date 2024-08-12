"use client";
import {useRouter,usePathname} from "next/navigation";
import {useTheme} from "@/context/ThemeContext";
import {IoArrowBack} from "react-icons/io5";

const BackButton = () => {
    const router = useRouter();
    const pathname = usePathname();
    const {darkMode} = useTheme();

    if (pathname === "/") {
        return null;
    }

    return (
        <button
            onClick={() => router.back()}
            className={`p-2 rounded-full ${
                darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            } transition-colors duration-200`}
            aria-label="Go back"
        >
            <IoArrowBack size={24} />
        </button>
    );
};

export default BackButton;
