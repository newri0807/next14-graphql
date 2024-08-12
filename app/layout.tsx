import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import ApolloProviderWrapper from "../context/ApolloProviderWrapper";
import {ThemeProvider} from "@/context/ThemeContext";
import {DarkModeToggle} from "@/components/DarkModeToggle";
import BackButton from '@/components/BackButton';


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <ApolloProviderWrapper>
                        <div className="container mx-auto p-4">
                           <div className="flex justify-between w-full my-4">                            
                             <BackButton />
                             <DarkModeToggle />
                           </div>
                            {children}
                        </div>
                    </ApolloProviderWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}
