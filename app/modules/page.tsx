"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
// import Link from "next/link";
import ModulesTryBox from "@/components/ModulesTryBox";

const Page = () => {
    // State for row 1 modules
    const [modulesRow1] = useState([
        { name: "AskWolfram", color: "bg-gray-700" },
        { name: "Calculate", color: "bg-gray-600" },
        { name: "Plot", color: "bg-gray-700" },
        { name: "", color: "bg-gray-600" },
        { name: "Translate Language", color: "bg-gray-700" },
        { name: "Analyze Sentiment", color: "bg-gray-600" },
        { name: "Generate PDF", color: "bg-gray-700" },
        { name: "Translate Language", color: "bg-gray-700" },
        { name: "Analyze Sentiment", color: "bg-gray-600" },
        { name: "Generate PDF", color: "bg-gray-700" },
    ]);

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
            <div className="max-w-7xl mx-auto px-4 pt-5">
                {/* Dark Section (Hero) */}
                <div className="bg-[#171717] rounded-[32px] ">
                    {/* Header / Nav */}
                    <header className="sm:p-10 sm:px-12 px-7 py-10">
                        <nav className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex flex-row items-center gap-2">
                                <span className="text-2xl">tangram.ai</span>
                                <Image
                                    alt="logo"
                                    width={30}
                                    height={30}
                                    src="/tangram_logo.png"
                                    className=""
                                />
                            </div>

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
                                className="hidden md:flex group inline-flex items-center justify-center py-3 px-6 text-sm font-semibold border-2 border-orange-500 rounded-full hover:bg-orange-500 hover:text-black"
                            >
                                <button>Log in / Sign Up</button>
                            </a>
                        </nav>
                    </header>

                    {/* Hero Section */}
                    <div className="text-center mt-2 sm:mt-7">
                        <h1 className="mx-auto max-w-4xl font-display text-3xl font-medium tracking-tight text-white sm:text-6xl">
                            Modules
                        </h1>
                        <p className="mx-auto mt-5 text-xl max-w-2xl text-gray-300">
                            A growing set of building blocks to automate your workflows.
                        </p>
                        {/* Scrolling Rows */}
                        <div className="mt-4 pb-8">
                            {/* First Row (scrolls left) */}
                            <div className="relative h-22 overflow-hidden mb-2">
                                <div className="absolute whitespace-nowrap animate-scroll-left">
                                    {modulesRow1.map((module, index) => (
                                        <div
                                            key={index}
                                            className={`inline-block w-46 h-20 ${module.color} m-2 p-2 rounded text-white flex items-center justify-center`}
                                        >
                                            {module.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Second Row (scrolls right) */}
                            <div className="relative h-24 overflow-hidden">
                                <div className="absolute whitespace-nowrap animate-scroll-right">
                                    {modulesRow2.map((module, index) => (
                                        <div
                                            key={index}
                                            className={`inline-block w-46 h-20 ${module.color} m-2 p-2 rounded text-white flex items-center justify-center`}
                                        >
                                            {module.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Section */}
            
            <section className="max-w-7xl mx-auto px-4 pb-20">
                <div className="bg-white rounded-[32px]">
                    <ModulesTryBox />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 bg-black text-gray-300">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
                        {/* Logo & Tagline */}
                        <div className="flex items-center gap-4">
                            <Image
                                alt="logo"
                                loading="lazy"
                                width={40}
                                height={30}
                                src="/tangram_logo.png"
                                className=""
                            />
                            <p className="text-gray-400">
                                Tangram.ai &mdash; Let us help you accelerate.
                            </p>
                        </div>
                        {/* Copyright */}
                        <p className="text-sm text-gray-500 mt-4 md:mt-0">
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