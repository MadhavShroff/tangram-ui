"use client";

import React, { useState } from "react";
import { GraphView } from "@/components/dag-rendering/GraphView";
import { Graph } from "@/utils/types";
import { ContextBox } from "@/components/dag-rendering/ContextBox";
// import TangramAnimation from "@/components/TangramAnimation";

const TestPage = () => {
    // Example DAG
    const [graph] = useState<Graph>({
        prompt: "Tell me about the Uffitzi Gallery in Florence.",
        nodes: [
            {
                id: "1",
                color: "#fdba74",
                name: "Generate Search Queries",
                level: 0,
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

    return (
        <div className="relative bg-black min-h-screen flex flex-col p-2 gap-2">
                <ContextBox contextItems={contextItems} />
            {/* Graph area */}
            <div className="flex-1 border-2 border-[#f2f2f2] rounded-xl mb-2">
                <GraphView graph={graph} />
                {/* <TangramAnimation /> */}
            </div>
        </div>
    );
};

export default TestPage;