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
import { UploadCloud, Github, Globe, Plus, Loader, Check } from "lucide-react";
import Image from "next/image";

interface UrlInputProps {
  onSubmit?: (url: string) => void;
}

const DocumentUrlInput: React.FC<UrlInputProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [favicon, setFavicon] = useState("");
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success'>('idle');

  // Simple URL validation using the URL constructor.
  const validateUrl = (value: string): boolean => {
    const fullUrlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    const simpleUrlRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
      
    if (!(fullUrlRegex.test(value) || simpleUrlRegex.test(value))) {
      return false
    } else {
      return true
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valid = validateUrl(value);
    setIsValid(valid);
    setUrl(value);
    setSubmissionState('idle'); // Reset submission state when URL changes
    if (valid) {
      const domain = new URL(value).hostname;
      setFavicon(`https://www.google.com/s2/favicons?domain=${domain}`);
    } else {
      setFavicon("");
    }
  };
  
  const handleSubmit = () => {
    if (!isValid) return;
    
    // Set to loading state
    setSubmissionState('loading');
    
    // Simulate API request
    setTimeout(() => {
      // Set to success state
      setSubmissionState('success');
      
      // Call the onSubmit callback if provided
      if (onSubmit && typeof onSubmit === 'function') {
        onSubmit(url);
      }
      
      // Reset to idle after showing success for a moment
      setTimeout(() => {
        setSubmissionState('idle');
        setUrl('');
        setIsValid(false);
      }, 1500);
    }, 2000);
  };
  
  return (
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
        {/* Button container */}
        <div className={`overflow-hidden transition-all duration-500 ${isValid ? "w-8 ml-1" : "w-0 ml-0"}`}>
          <button 
            onClick={handleSubmit}
            disabled={submissionState !== 'idle'}
            className={`h-8 w-8 transition-all duration-150 border-2 border-[#1E5A3E] rounded-md flex items-center justify-center ${submissionState === 'idle' ? 'hover:bg-[#1E5A3E] cursor-pointer' : submissionState === 'success' ? 'bg-[#1E5A3E]' : ''} ${!isValid ? "hidden" : ""}`}
          >
            {submissionState === 'idle' && (
              <Plus className="text-[#1E5A3E] hover:text-white" />
            )}
            {submissionState === 'loading' && (
              <Loader className="animate-spin text-[#1E5A3E]" size={16} />
            )}
            {submissionState === 'success' && (
              <Check className="text-white" size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export function AddMediaButtonDropdown() {
  const handleUrlSubmit = (url: string) => {
    console.log('URL submitted:', url);
    // Further processing here
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1 font-medium text-gray-200 px-3 py-1.5 hover:bg-[#0c2419] rounded-md transition-colors">
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
        <DocumentUrlInput onSubmit={handleUrlSubmit} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
