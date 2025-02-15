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
import { UploadCloud, Github, Globe, Plus, ChevronRight } from "lucide-react";
import Image from "next/image";

export function AddMediaButtonDropdown() {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [favicon, setFavicon] = useState("");
  // const [faviconError, setFaviconError] = useState(false);

  // Simple URL validation using the URL constructor.
  const validateUrl = (value: string): boolean => {
    try {
      new URL(value);
      if (!(
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(value)
      )) {
        throw new Error("Invalid URL");
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valid = validateUrl(value);
    setIsValid(valid);
    setUrl(value);
    if (valid) {
      const domain = new URL(value).hostname;
      setFavicon(`https://www.google.com/s2/favicons?domain=${domain}`);
      // setFaviconError(false);
    } else {
      setFavicon("");
      // setFaviconError(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1 font-medium text-gray-200 px-3 py-1.5 hover:bg-[#0c2419] rounded-md transition-colors"
      >
        Add <Plus className="text-sm leading-none" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-82 p-1">
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
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Or Enter Document URL
          </label>
          <div className="flex flex-row transition-all duration-500">
            <div className={`h-8 flex-1 flex items-center border-2 ${isValid ? "border-blue-500 shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]" : "border-gray-600"} rounded-md px-1 py-1 bg-gray-800 transition-all duration-500`}>
              {false ? (
                <Image
                  src={favicon}
                  alt=""
                  height={20}
                  width={20}
                  className="mr-1"
                  // onError={() => setFaviconError(true)}
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
            {/* Chevron container */}
            <div className={`overflow-hidden transition-all duration-500 ${isValid ? "w-8 ml-1" : "w-0 ml-0"}`}>
            <div className={"h-8 w-8 border-2 border-green-300 rounded-md flex items-center justify-center hover:bg-green-200 " + (!isValid ? "hidden" : "")}>
              <ChevronRight />
            </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}