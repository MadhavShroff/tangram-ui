"use client";
import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black text-gray-300">
      <LandingPage />
    </main>
  );
}

function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* A fixed-sized parent, so we can position items reliably */}
      <div className="relative w-[300px] h-[300px]">
        {/* Face image fills the container */}
        <Image
          alt="Profile"
          src="https://saasta.buildwithiqra.com/lucas.jpg"
          fill
          className="object-cover rounded-full"
          priority
        />
        {/* Sunglasses: position these where the eyes should be */}
        <div
          className="absolute"
          style={{
            top: '35%',     // adjust as needed
            left: '50%',    // start from the horizontal center
            transform: 'translateX(-50%)', // center horizontally
          }}
        >
          <Image
            alt="Glasses"
            src="https://e1.pngegg.com/pngimages/178/57/png-clipart-webpunk-black-framed-sunglasses-thumbnail.png"
            width={100} // shrink the glasses
            height={40}
          />
        </div>
      </div>
    </div>
  );
}