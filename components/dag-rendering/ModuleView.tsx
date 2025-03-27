import React, { useState } from "react";
import { CurvedArrow } from "./CurvedArrow";
import Block from "./Block";
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

  if (graph)
    return (
      <>
        <div>{moduleName}</div>
        {graph.nodes.map((node: Node, index: number) => {
          return (
            <Block
              key={index}
              node={node}
              onClick={() => {
                console.log(node);
                // setNodeSelected(node);
              }}
              onUpdatePoints={(inputs, outputs) => {
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
              }}
            />
          );
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
      </>
    );
  else return <></>;
};
