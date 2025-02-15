"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UploadCloud, Github, Globe, Plus } from "lucide-react";
import Image from "next/image";

export function AddMediaButtonDropdown() {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [favicon, setFavicon] = useState("");
  const [faviconError, setFaviconError] = useState(false);

  // Simple URL validation using the URL constructor.
  const validateUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);

    if (validateUrl(value)) {
      setIsValid(true);
      setFaviconError(false); // Reset error state if we have a new valid URL
      // Extract domain from URL and generate a favicon URL (using Google's favicon service)
      const domain = new URL(value).hostname;
      setFavicon(`https://www.google.com/s2/favicons?domain=${domain}`);
    } else {
      setIsValid(false);
      setFavicon("");
      setFaviconError(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
          inline-flex items-center gap-1
          font-medium
          text-gray-200
          px-3 py-1.5
          hover:bg-[#0c2419]
          rounded-md
          transition-colors
        "
      >
        Add <Plus className="text-sm leading-none" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-1">
        <DropdownMenuLabel className="mb-2">Upload Document</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col">
          <DropdownMenuItem onClick={() => { /* Trigger file input for local upload */ }}>
            <UploadCloud className="mr-1 w-4" /> From Computer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { /* Trigger GitHub URL upload workflow */ }}>
            <Github className="mr-1 w-4" /> From GitHub URL
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="px-1 py-1">
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Or Enter Document URL
          </label>
          <div
            className={`flex items-center border ${
              isValid ? "border-blue-500" : "border-gray-600"
            } rounded-md px-1 py-1 bg-gray-800`}
          >
            {/* If URL is valid, we have a favicon, and no error has occurred, show the image.
                Otherwise, show the Globe icon. */}
            {isValid && favicon && !faviconError ? (
              <Image
                src={favicon}
                alt=""
                height={20}
                width={20}
                className="mr-1"
                onError={() => setFaviconError(true)}  // If favicon fails to load, fallback to Globe.
              />
            ) : (
              <Globe className="w-4 h-4 mr-2 text-gray-400" />
            )}
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com/"
              className="bg-transparent flex-1 text-sm text-gray-200 outline-none placeholder-gray-500"
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}