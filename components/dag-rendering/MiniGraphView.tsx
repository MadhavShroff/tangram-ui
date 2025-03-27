import React, { useState } from "react";
import { CurvedArrow } from "./CurvedArrow";
import Block from "./Block";
import { Graph, Node, Point } from "@/utils/types";
import FixedPositionBlock from "./FixedPositionBlock";

interface MiniGraphViewProps {
  nodes: Node[];
  edges: { from: string; to: string }[];
}

export const MiniGraphView = ({ nodes, edges }: MiniGraphViewProps) => {
  const [inputCoordsMap, setInputCoordsMap] = useState<Map<string, Point>>(new Map());
  const [outputCoordsMap, setOutputCoordsMap] = useState<Map<string, Point>>(new Map());

  const getOutputCoord = (blockId: string): Point => {
    const got = outputCoordsMap.get(blockId);
    if (got) return got;
    else return new Point(0, 0);
  };
  
  const getInputCoord = (blockId: string): Point => {
    const got = inputCoordsMap.get(blockId);
    if (got) return got;
    else return new Point(0, 0);
  };

  const handleBlockPointsUpdate = (blockId: string) => (inputs: {blockId: string; updatedPoint: Point}[], outputs: {blockId: string; updatedPoint: Point}[]) => {
    setInputCoordsMap((prevMap) => {
      const newMap = new Map(prevMap);
      inputs.forEach((input) => {
        newMap.set(input.blockId, input.updatedPoint);
      });
      return newMap;
    });
    
    setOutputCoordsMap((prevMap) => {
      const newMap = new Map(prevMap);
      outputs.forEach((output) => {
        newMap.set(output.blockId, output.updatedPoint);
      });
      return newMap;
    });
  };

  return (
    <div className="relative w-full min-h-[400px]">
      {/* Render nodes */}
      {nodes.map((node, index) => (
        <div
          key={index}
          className={`absolute ${
            node.id === "export-pdf" 
              ? "bottom-[80px] left-[50%] transform -translate-x-1/2" 
              : node.id === "output-pdf" 
                ? "bottom-0 left-[40%] transform -translate-x-1/2"
                : node.id === "content-input" 
                  ? "top-0 left-[25%] transform -translate-x-1/2"
                  : node.id === "options-input"
                    ? "top-0 left-[50%] transform -translate-x-1/2"
                    : "top-0 left-[75%] transform -translate-x-1/2" // quality-input
          }`}
        >
          <FixedPositionBlock 
            node={node}
            onClick={() => {}}
          />
        </div>
      ))}

      {/* Render edges */}
      {edges.map((edge, index) => (
        <CurvedArrow
          key={index}
          from={getOutputCoord(edge.from)}
          to={getInputCoord(edge.to)}
        />
      ))}
    </div>
  );
};