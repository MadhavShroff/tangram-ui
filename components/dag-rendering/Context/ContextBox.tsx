"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AiFillFileImage, AiFillFileText, AiFillFile } from "react-icons/ai";
import { ChevronUp, ChevronDown } from "lucide-react";
import { AddMediaButtonDropdown } from "./AddMediaButtonDropdown";

// Helper function to determine the icon based on file extension.
const getFileIcon = (fileName: string) => {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".gif")) {
    return <AiFillFileImage className="mr-1 text-lg" />;
  }
  if (lower.endsWith(".pdf")) {
    return <AiFillFileText className="mr-1 text-lg" />;
  }
  return <AiFillFile className="mr-2 text-xl" />;
};

export const ContextBox = ({ contextItems }: { contextItems: string[] }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`absolute top-4 right-4 bg-[#1E5A3E] shadow-md rounded-md transition-all duration-500 flex flex-col p-1 ${isCollapsed ? "w-32 h-10" : "w-72 max-h-80"}`}>
      <div className="flex justify-between">
        <button className="text-white p-2 bg-[#1E5A3E] hover:bg-[#0c2419] transition-colors rounded h-8 w-8" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed && <ChevronDown size={16} />}
        </button>
        <div className="text-[#c5ecd9] font-semibold text-lg mr-2 mt-[1.3px]">Context</div>
      </div>
      {!isCollapsed && (
        <>
          <div className="relative flex-1">
            <ScrollArea className="h-20 w-full rounded-md min-h-0">
              {[...contextItems].reverse().map((item, idx) => (
                <div key={idx} className="flex items-center text-[#c5ecd9] text-sm px-2 py-1 bg-[#1E5A3E] rounded hover:bg-[#0c2419] transition-colors">
                  {getFileIcon(item)}
                  <span>{item}</span>
                </div>
              ))}
              <div className="h-6" />
            </ScrollArea>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#1E5A3E] to-transparent" />
          </div>
          <div className="flex justify-between mt-2">
            <button className="text-white p-2 bg-[#1E5A3E] hover:bg-[#0c2419] transition-colors rounded h-8 w-8" onClick={() => setIsCollapsed(!isCollapsed)}>
              <ChevronUp size={16} />
            </button>
            <AddMediaButtonDropdown />
          </div>
        </>
      )}
    </div>
  );
};