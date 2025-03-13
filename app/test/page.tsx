"use client";

import React, { useState, useRef, useEffect } from "react";
import { GraphView } from "@/components/dag-rendering/GraphView";
import { Graph } from "@/utils/types";
import { ContextBox } from "@/components/dag-rendering/ContextBox";
import { ArrowRight } from "lucide-react";
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
    "DraftDo123cument.pdf",
    "DraftDo412cumeqsnt.pdf",
    "DraftDo123cument.pdf",
    "DraftDocu312412ment.pdf",
    "Draft123Document.pdf",
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

  return (
    <div className="bg-black h-screen flex flex-col relative overflow-hidden">
      {/* Main content area */}
      <div className="w-full h-full px-2 py-2 max-w-[1400px] mx-auto flex flex-col">
        <div className="flex-1 border-2 border-[#f2f2f2] rounded-xl h-full">
          <ContextBox contextItems={contextItems} />
          <GraphView graph={graph} />
        </div>
      </div>

      {/* Fixed textarea at bottom center */}
      <div className="fixed flex items-center bottom-8 left-1/2 transform -translate-x-1/2 border border-[#f2f2f2] rounded-xl w-[600px] max-w-[90%] p-3 bg-black">
        <textarea
          ref={textareaRef}
          value={followUp}
          onChange={(e) => setFollowUp(e.target.value)}
          placeholder="Ask a follow up..."
          rows={1}
          className="w-full bg-transparent text-white text-xl font-bold px-3 pt-[1px] rounded-lg focus:outline-none placeholder-gray-500 resize-none overflow-hidden"
        />
        <div className="rounded-full border-orange-500 border-2 hover:bg-orange-500 h-[40px] w-[44px] flex items-center justify-center group">
            <ArrowRight className="text-white group-hover:text-black" />
        </div>
      </div>
    </div>
  );
};

export default TestPage;