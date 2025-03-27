"use client";

import React, { useState, useRef, useEffect } from "react";
import { GraphView } from "@/components/dag-rendering/GraphView";
import { Graph } from "@/utils/types";
import { ContextBox } from "@/components/dag-rendering/Context/ContextBox";
import { ArrowRight, Mic } from "lucide-react";
// import TangramAnimation from "@/components/TangramAnimation";

const TestPage = () => {
    // Example DAG
    const [graph] = useState<Graph>({
        prompt: "Tell me about the Uffitzi Gallery in Florence.",
        nodes: [
            {
                id: "1", color: "#fdba74", name: "Generate Search Queries", level: 0,
                inputs: [
                    {
                        number: 1,
                        type: "string",
                        typeName: "Search query for which to generate related queries",
                        name: "Search Query",
                    },
                ],
                outputs: [
                    {
                        number: 1,
                        type: "string",
                        typeName: "Search Query 1",
                        name: "Search Query 1",
                    },
                    {
                        number: 2,
                        type: "string",
                        typeName: "Search Query 2",
                        name: "Search Query 2",
                    },
                    {
                        number: 3,
                        type: "string",
                        typeName: "Search Query 3",
                        name: "Search Query 3",
                    },
                ],
            },
            {
                id: "2",
                color: "#fde047",
                name: "Perform Google Seach",
                level: 1,
                inputs: [
                    {
                        number: 1,
                        type: "string[]",
                        typeName: "String of Search Queries",
                        name: "Search Query List",
                    },
                ],
                outputs: [
                    {
                        number: 1,
                        type: "JSON<SearchResult>",
                        typeName: "Structured Object of Search Results",
                        name: "Search Result",
                    },
                ],
            },
            {
                id: "3",
                color: "#bef264",
                name: "Rephrase content",
                level: 2,
                inputs: [
                    {
                        number: 1,
                        type: "JSON<SearchResult>",
                        typeName: "Structured Object of Search Results",
                        name: "Search Result",
                    },
                    {
                        number: 2,
                        type: "string[]",
                        typeName: "Additional Context",
                        name: "Additional Context",
                    },
                ],
                outputs: [
                    {
                        number: 1,
                        type: "Markdown",
                        typeName: "Extracted Information",
                        name: "Extracted Information",
                    },
                ],
            },
            {
                id: "4",
                color: "#86efac",
                name: "Display Output",
                level: 3,
                inputs: [
                    {
                        number: 1,
                        type: "Markdown",
                        typeName: "Extracted Information",
                        name: "Extracted Information",
                    },
                ],
                outputs: [
                    {
                        number: 1,
                        type: "PDF URL",
                        typeName: "Downloadable PDF Link",
                        name: "Generated PDF",
                    },
                ],
            },
        ],
        edges: [
            { from: "0", to: "1.1" },
            { from: "0", to: "2.1" },
            { from: "1.1", to: "2.1" },
            { from: "1.2", to: "2.1" },
            { from: "1.3", to: "2.1" },
            { from: "2.1", to: "3.2" },
            { from: "0", to: "3.1" },
            { from: "3.1", to: "4.1" },
            { from: "3.1", to: "out" },
        ],
    });

  // Example context items
  const [contextItems] = useState<string[]>([
    "UploadedImage.png",
    "DraftDo123cument.jpg",
    "DraftDo412cumeqsnt.jpeg",
    "DraftDo123cument.pdf",
    "DraftDocu312412ment.pdf",
    "Draft123Document.gif",
  ]);

  // Track the "follow up" value
  const [followUp, setFollowUp] = useState("");

  // A ref for the textarea so we can measure and adjust its height
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Whenever followUp changes, recalc the textarea height
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto so scrollHeight is correct
      textareaRef.current.style.height = "auto";
      // Set height to match content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [followUp]);

  const [position, setPosition] = useState('center'); // center, right, bottomRight, bottomCenter
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // 640px is Tailwind's sm breakpoint
    };
    
    // Check on mount
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Handle the animation sequence
  const handleTransitionClick = () => {
    // Don't animate on small screens
    if (isSmallScreen) return;
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    // Prepare for animation
    setIsAnimating(true);
    
    // Process next frame before starting animation
    requestAnimationFrame(() => {
      if (position === 'center') {
        // Outward sequence
        // First step - move to right
        setPosition('right');
        
        // Second step after pause
        setTimeout(() => {
          setPosition('bottomRight');
          
          // Animation complete
          setTimeout(() => {
            setIsAnimating(false);
          }, 1200);
        }, 800);
      } else {
        // Return sequence
        // First step - move to bottom center
        setPosition('bottomCenter');
        
        // Second step after pause
        setTimeout(() => {
          setPosition('center');
          
          // Animation complete
          setTimeout(() => {
            setIsAnimating(false);
          }, 1200);
        }, 800);
      }
    });
  };

  return (
    <div className="bg-black h-screen flex flex-col relative overflow-hidden">
      {/* Main content area */}
      <div className="w-full h-full px-2 py-2 flex flex-col">
        <div className="flex-1 border-2 border-[#f2f2f2] rounded-xl h-full">
          <ContextBox contextItems={contextItems} />
          <GraphView graph={graph} />
        </div>
      </div>

      {/* Fixed textarea at bottom center */}
      <div 
        className={`fixed flex items-center transform border border-[#f2f2f2] rounded-xl w-[600px] max-w-[90%] p-3 bg-black
          ${isSmallScreen ? 'bottom-4 right-4' : // Always fixed position on small screens
            position === 'center' ? 'bottom-8 left-1/2 -translate-x-1/2' : 
            position === 'right' ? 'bottom-8 right-4 translate-x-0' : 
            position === 'bottomRight' ? 'bottom-4 right-4 translate-x-0' : 
            position === 'bottomCenter' ? 'bottom-4 left-1/2 -translate-x-1/2' : 
            'bottom-8 left-1/2 -translate-x-1/2' // Default fallback to center
          }
          ${isAnimating ? 'will-change-[transform,left,bottom,right]' : ''}`}
        style={{
          // Smooth easing with very slight emphasis
          transition: 'all 1200ms cubic-bezier(0.2, 0.8, 0.2, 1.0)',
        }}
      >
        <textarea
          ref={textareaRef}
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          placeholder="Ask a follow up..."
          rows={1}
          className="w-full bg-transparent text-white text-xl font-bold px-3 pt-[1px] rounded-lg focus:outline-none placeholder-gray-500 resize-none overflow-hidden"
        />
        <div className="flex items-center gap-2">
          <div 
            className={`rounded-full border-orange-500 border-2 hover:bg-orange-500 h-[40px] w-[40px] flex items-center justify-center group cursor-pointer ${isAnimating ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={handleTransitionClick}
          >
              <ArrowRight className="text-white group-hover:text-black" />
          </div>
          <div className="rounded-full border-orange-500 border-2 hover:bg-orange-500 h-[40px] w-[40px] flex items-center justify-center group cursor-pointer">
              <Mic className="text-white group-hover:text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;