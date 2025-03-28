import React, { useState } from "react";
import { CurvedArrow } from "./CurvedArrow";
import Block from "./Block";
import LargerBlock from "./LargerBlock";
import { OptionsBlock, TextAreaBlock, PDFViewerBlock } from "./blocks";
import { Graph, Node, Point } from "@/utils/types";

export const ModuleView = ({ graph, moduleName }: { graph: Graph, moduleName: string }) => {
  const [promptOutputCoordinate] = useState<Point>(new Point(0, 0));
  const [inputCoordsMap, setInputCoordsMap] = useState<Map<string, Point>>(new Map());
  const [outputCoordsMap, setOutputCoordsMap] = useState<Map<string, Point>>(new Map());
  // const [nodeSelected, setNodeSelected] = useState<Node>();
  // (BlockId -> Point)
  // Update the coordsMap on every block update
  const getOutputCoord = (blockId: string): Point => {
    if (blockId === "0") return promptOutputCoordinate;
    else {
      const got = outputCoordsMap.get(blockId);
      if (got) return got;
      else return new Point(0, 0);
    }
  };
  const getInputCoord = (blockId: string): Point => {
    const got = inputCoordsMap.get(blockId);
    if (got) return got;
    else return new Point(0, 0);
  };

  // Initialize state for form inputs
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  
  // Helper to get the node type
  const getNodeType = (node: Node): string => {
    // Main processing node
    if (node.id.toLowerCase() === moduleName.toLowerCase() || node.color === "#000000") {
      return "main";
    }
    
    // Nodes with output types
    if (node.outputs.length > 0) {
      const outputType = node.outputs[0].type.toLowerCase();
      
      if (outputType.includes("string") || outputType.includes("text") || outputType.includes("markdown")) {
        return "text";
      }
      
      if (outputType.includes("option") || outputType.includes("enum") || outputType.includes("select")) {
        return "options";
      }
    }
    
    // Nodes with input types
    if (node.inputs.length > 0) {
      const inputType = node.inputs[0].type.toLowerCase();
      
      if (inputType.includes("file") && (inputType.includes("pdf") || node.name.toLowerCase().includes("pdf"))) {
        return "pdf";
      }
    }
    
    // Default to basic block
    return "default";
  };
  
  // Handle form value changes
  const handleFormValueChange = (nodeId: string, value: unknown) => {
    setFormValues(prev => ({
      ...prev,
      [nodeId]: value
    }));
  };
  
  // Handle point updates for all blocks
  const handleUpdatePoints = (inputs: {blockId: string; updatedPoint: Point}[], outputs: {blockId: string; updatedPoint: Point}[]) => {
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

  if (graph)
    return (
      <>
        {/* Module title heading */}
        <h2 className="text-2xl font-semibold text-white mb-6">{moduleName}</h2>
        
        {/* Render nodes with appropriate block types */}
        {graph.nodes.map((node: Node, index: number) => {
          const nodeType = getNodeType(node);
          
          // Determine which block component to use based on node type
          switch (nodeType) {
            case "main":
              return (
                <LargerBlock
                  key={index}
                  node={node}
                  onClick={() => console.log(node)}
                  onUpdatePoints={handleUpdatePoints}
                />
              );
              
            case "text":
              return (
                <TextAreaBlock
                  key={index}
                  node={node}
                  onClick={() => console.log(node)}
                  onUpdatePoints={handleUpdatePoints}
                  value={formValues[node.id] || ""}
                  onChange={(value) => handleFormValueChange(node.id, value)}
                  placeholder={`Enter ${node.name} here...`}
                />
              );
              
            case "options":
              // Default options if none are specified
              const defaultOptions = [
                { value: "minimal", label: "Minimal" },
                { value: "standard", label: "Standard" },
                { value: "advanced", label: "Advanced" }
              ];
              
              return (
                <OptionsBlock
                  key={index}
                  node={node}
                  onClick={() => console.log(node)}
                  onUpdatePoints={handleUpdatePoints}
                  options={defaultOptions}
                  selectedValue={formValues[node.id] || "standard"}
                  onOptionChange={(value) => handleFormValueChange(node.id, value)}
                />
              );
              
            case "pdf":
              return (
                <PDFViewerBlock
                  key={index}
                  node={node}
                  onClick={() => console.log(node)}
                  onUpdatePoints={handleUpdatePoints}
                  pdfUrl="https://arxiv.org/pdf/2503.20783"
                  onDownload={() => window.open("https://arxiv.org/pdf/2503.20783", "_blank")}
                />
              );
              
            default:
              return (
                <Block
                  key={index}
                  node={node}
                  onClick={() => console.log(node)}
                  onUpdatePoints={handleUpdatePoints}
                />
              );
          }
        })}
        {graph.edges.map((edge, index) => {
          return (
            <CurvedArrow
              key={index}
              from={getOutputCoord(edge.from)}
              to={getInputCoord(edge.to)}
            />
          );
        })}
        
        {/* Module execution button */}
        <div className="mt-12 flex justify-center">
          <button 
            className="bg-orange-500 hover:bg-orange-600 text-black font-medium py-3 px-10 rounded-full text-lg"
            onClick={() => {
              console.log('Executing module with values:', formValues);
              // Handle module execution here
            }}
          >
            Generate {moduleName}
          </button>
        </div>
      </>
    );
  else return <></>;
};
