"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ModuleView } from "@/components/dag-rendering/ModuleView";
import { Graph } from "@/utils/types";
import { toPascalCase } from "@/utils/utils";
import { GraphConstructor, NodeConstructor, IOTypeConstructor } from "@/utils/constructors";

export default function ModulePage({ params }: { params: { moduleName: string } | Promise<{ moduleName: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params as never) as { moduleName: string };
  const { moduleName } = resolvedParams;

  // Commented out for now - would be used to fetch module specs from an API
  // const fetchModuleGraph = async (moduleName: string): Promise<Graph> => {
  //   const res = await fetch(`/api/modules/${moduleName}`);
  //   return res.json();
  // }

  const exportToPdfSpec: string = "ExportToPdf(Markdown 'Content', Options 'Options', Options 'Quality'): (S3Url 'PDF URL')";

  /**
   * A Graph in this component represents the data flow for a module:
   * - Input nodes (colored blocks at top) represent the input parameters
   * - The main processing node (black block in middle) represents the module itself
   * - Output nodes (colored blocks at bottom) represent the output results
   * - Edges connect the data flow between nodes
   *
   * Module specs follow this format:
   * ModuleName(Type1 'Param1', Type2 'Param2', ...): (OutputType1 'OutputName1', ...)
   * 
   * For example:
   * "ExportToPdf(Markdown 'Content', Options 'Options', Options 'Quality'): (S3Url 'PDF URL')"
   * 
   * This creates a visualization with:
   * - 3 input nodes (Content, Options, Quality) at levels 1-3
   * - 1 processing node (ExportToPdf) at level 4
   * - 1 output node (PDF URL) at level 5
   * - Edges connecting the appropriate dots
   */

  const moduleToGraph = (moduleSpec: string): Graph => {
    const name = moduleSpec.split("(")[0];
    const inputs = moduleSpec.split("(")[1].split(")")[0].split(", ");
    const outputs = moduleSpec.split(": ")[1].replace(")", "").split(", ");
    
    // Create a new graph
    const graph = new GraphConstructor({
      prompt: `${name} Module`
    });
    
    // Create input nodes
    const inputNodes = inputs.map((input, index) => {
      const [type, inputName] = input.split(" ");
      
      // Create an input node with an output point
      return new NodeConstructor({
        id: `input-${index}`,
        name: inputName.replace(/'/g, ""),
        color: getColorForIndex(index),
        level: index + 1,
        outputs: [
          new IOTypeConstructor({
            number: 1,
            type: type,
            typeName: type,
            name: inputName.replace(/'/g, "")
          })
        ]
      });
    });
    
    // Create main processing node
    const mainNode = new NodeConstructor({
      id: moduleName,
      name,
      color: "#000000", // Black color
      level: inputs.length + 1, // Main node comes after all inputs
      inputs: inputs.map((input, index) => {
        const [type, inputName] = input.split(" ");
        return new IOTypeConstructor({
          number: index + 1,
          type,
          typeName: type,
          name: inputName.replace(/'/g, "")
        });
      }),
      outputs: outputs.map((output, index) => {
        const [type, outputName] = output.split(" ");
        return new IOTypeConstructor({
          number: index + 1,
          type,
          typeName: type,
          name: outputName.replace(/'/g, "")
        });
      })
    });
    
    // Create output nodes
    const outputNodes = outputs.map((output, index) => {
      const [type, outputName] = output.split(" ");
      
      // Create an output node with an input point
      return new NodeConstructor({
        id: `output-${index}`,
        name: outputName.replace(/'/g, ""),
        color: "#fdba74", // Orange color
        level: inputs.length + 2 + index, // Output nodes start after main node
        inputs: [
          new IOTypeConstructor({
            number: 1,
            type: type,
            typeName: type,
            name: outputName.replace(/'/g, "")
          })
        ]
      });
    });
    
    // Add all nodes to the graph
    inputNodes.forEach(node => graph.addNode(node));
    graph.addNode(mainNode);
    outputNodes.forEach(node => graph.addNode(node));
    
    // Add edge connections
    inputNodes.forEach((node, index) => {
      graph.addEdge(`${node.id}.1`, `${moduleName}.${index + 1}`);
    });
    
    outputNodes.forEach((node, index) => {
      graph.addEdge(`${moduleName}.${index + 1}`, `${node.id}.1`);
    });
    
    return graph;
  }
  
  // Helper function to get colors for different input types
  function getColorForIndex(index: number): string {
    const colors = [
      "#86efac", // Green
      "#bef264", // Light green
      "#fde047", // Yellow
      "#fdba74", // Orange
      "#f87171", // Red
      "#d8b4fe"  // Purple
    ];
    return colors[index % colors.length];
  }


  // Create graph using moduleToGraph function
  const generatedGraph = moduleToGraph(exportToPdfSpec);
  const [graph] = useState<Graph>(generatedGraph);

  return (
    <main className="min-h-screen w-full bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-[#171717] rounded-[20px] p-8">
          <button onClick={() => router.back()} className="mb-6 text-gray-400 hover:text-orange-500" >
            ← Back to Modules
          </button>

          <h1 className="text-3xl font-bold mb-6">{toPascalCase(moduleName)}</h1>

          {/* Render the module graph visualization */}
          <ModuleView graph={graph} moduleName={toPascalCase(moduleName)}/>
        </div>
      </div>
    </main>
  );
}