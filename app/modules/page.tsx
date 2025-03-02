"use client";
import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
import ModulesTryBox from "@/components/ModulesTryBox";
import TangramAnimation from "@/components/TangramAnimation";

const LogoAnimated = () => {
    return (
        <div className="flex flex-row items-center gap-2 h-14 overflow-hidden">
            <span className="text-xl sm:text-2xl">tangram.ai</span>
            <div className="h-14 w-17 sm:h-16 mb-2 pt-2">
                <TangramAnimation scale={0.3} />
            </div>
        </div>
    );
}

// Modules Page
const Page = () => {

    // State for row 2 modules
    const [modulesRow2] = useState([
        { name: "Summarize Text", color: "bg-gray-600" },
        { name: "Translate Language", color: "bg-gray-700" },
        { name: "Analyze Sentiment", color: "bg-gray-600" },
        { name: "Generate PDF", color: "bg-gray-700" },
        { name: "Translate Language", color: "bg-gray-700" },
        { name: "Generate PDF", color: "bg-gray-700" },
        { name: "Translate Language", color: "bg-gray-700" },
        { name: "Analyze Sentiment", color: "bg-gray-600" },
        { name: "Generate PDF", color: "bg-gray-700" },
    ]);

    useEffect(() => {
        // Any side effects or data fetching could go here
    }, []);

    return (
        <main className="min-h-screen w-full bg-black text-gray-300">
            {/* Container for the page content */}
            <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-3 sm:pt-5">
                {/* Dark Section (Hero) */}
                <div className="bg-[#171717] rounded-[20px] sm:rounded-[32px] ">
                    {/* Header / Nav */}
                    <header className="px-4 py-6 sm:p-10 sm:px-12">
                        <nav className="flex items-center justify-between">
                            {/* Logo */}
                            <LogoAnimated />

                            {/* Navigation Items */}
                            {/* <ul className="ml-16 bg-[#232323] border border-[#353434] sm:rounded-full sm:h-14 sm:w-[420px] justify-center items-center flex gap-3 font-semibold rounded-lg py-1 px-2 text-base text-gray-300 hidden md:flex">
                            <li>
                                <Link className="py-3 sm:px-5 hover:bg-gray-700 hover:rounded-full" href="/#">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="py-3 sm:px-5 hover:bg-gray-700 hover:rounded-full"
                                    href="/#about"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="py-3 sm:px-5 hover:bg-gray-700 hover:rounded-full"
                                    href="/#feature"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="py-3 sm:px-5 hover:bg-gray-700 hover:rounded-full"
                                    href="/#pricing"
                                >
                                    Pricing
                                </Link>
                            </li>
                        </ul> */}

                            {/* Get Started Button */}
                            <a
                                href="mailto:test@gmail.com"
                                className="hidden md:flex group inline-flex items-center justify-center text-[12px] font-semibold border-2 border-orange-500 rounded-full hover:bg-orange-500 hover:text-black"
                            >
                                <button className="p-2">Log in / Sign Up</button>
                            </a>
                        </nav>
                    </header>

                    {/* Hero Section */}
                    <div className="text-center mt-2 sm:mt-7">
                        <h1 className="mx-auto max-w-4xl font-display text-2xl sm:text-3xl md:text-6xl font-medium tracking-tight text-white px-4">
                            Modules
                        </h1>
                        <p className="mx-auto mt-3 sm:mt-5 text-base sm:text-xl max-w-2xl text-gray-300 px-4">
                            A growing set of building blocks to automate your workflows.
                        </p>
                        {/* Scrolling Rows */}
                        <div className="mt-4 pb-6 sm:pb-8">
                            {/* Second Row (scrolls right) */}
                            <div className="relative h-16 sm:h-24 overflow-hidden">
                                <div className="absolute whitespace-nowrap animate-scroll-left">
                                    {modulesRow2.map((module, index) => (
                                        <div key={index} className={`inline-block w-36 sm:w-46 h-14 sm:h-20 ${module.color} m-1 sm:m-2 p-2 rounded text-sm sm:text-base text-white flex items-center justify-center`} >
                                            {module.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Second Row (scrolls right) */}
                            <div className="relative h-16 sm:h-24 overflow-hidden">
                                <div className="absolute whitespace-nowrap animate-scroll-right">
                                    {modulesRow2.map((module, index) => (
                                        <div key={index} className={`inline-block w-36 sm:w-46 h-14 sm:h-20 ${module.color} m-1 sm:m-2 p-2 rounded text-sm sm:text-base text-white flex items-center justify-center`} >
                                            {module.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Second Row (scrolls right) */}
                            <div className="relative h-16 sm:h-24 overflow-hidden">
                                <div className="absolute whitespace-nowrap animate-scroll-left">
                                    {modulesRow2.map((module, index) => (
                                        <div
                                            key={index}
                                            className={`inline-block w-36 sm:w-46 h-14 sm:h-20 ${module.color} m-1 sm:m-2 p-2 rounded text-sm sm:text-base text-white flex items-center justify-center`}
                                        >
                                            {module.name}
                                        </div>
                                    )).slice(0, 11)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Section */}

            <section className="max-w-7xl mx-auto px-2 sm:px-4 pb-12 sm:pb-20">
                <div className="bg-white rounded-[32px]">
                    <ModulesTryBox />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 sm:py-10 bg-black text-gray-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                        {/* Logo & Tagline */}
                        <LogoAnimated />
                        {/* Copyright */}
                        <p className="text-xs sm:text-sm text-gray-500 mt-4 md:mt-0">
                            &copy; 2025 Tangram.ai. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Inline CSS for marquee keyframes */}
            <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-40%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }
      `}</style>
        </main>
    );
};

export default Page;