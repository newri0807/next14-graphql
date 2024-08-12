"use client";

import React, {createContext, useState, useContext, useEffect} from "react";

// ThemeContextType 정의: 다크 모드 상태와 토글 함수의 타입을 지정합니다.
type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

// ThemeContext 생성: 초기값은 undefined로 설정합니다.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider 컴포넌트: 자식 컴포넌트들에게 테마 컨텍스트를 제공합니다.
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    // darkMode 상태와 이를 변경하는 함수를 선언합니다.
    const [darkMode, setDarkMode] = useState(false);

    // 컴포넌트가 마운트될 때 사용자의 시스템 설정에 따라 초기 다크 모드 상태를 설정합니다.
    useEffect(() => {
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDarkMode);
    }, []);

    // 다크 모드를 토글하는 함수를 정의합니다.
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // ThemeContext.Provider를 사용하여 자식 컴포넌트들에게 darkMode와 toggleDarkMode를 제공합니다.
    return (
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            {/* darkMode 상태에 따라 적절한 클래스를 적용합니다. */}
            <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>{children}</div>
        </ThemeContext.Provider>
    );
};

// useTheme 훅: 컴포넌트에서 테마 컨텍스트를 쉽게 사용할 수 있게 해줍니다.
export const useTheme = () => {
    const context = useContext(ThemeContext);
    // ThemeProvider 외부에서 useTheme이 사용되었을 때 에러를 throw합니다.
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
