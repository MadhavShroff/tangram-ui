import React, { createRef } from "react";
import { Node, Point } from "@/utils/types";

interface ILargerBlockProps {
  node: Node;
  onClick: () => void;
  onUpdatePoints: (
    inputs: { blockId: string; updatedPoint: Point }[],
    outputs: { blockId: string; updatedPoint: Point }[]
  ) => void;
}

/**
 * LargerBlock component - a fork of Block with increased size
 * Uses larger font, more padding, and bigger connection dots
 */
export default class LargerBlock extends React.Component<ILargerBlockProps> {
  public inputs: Point[] = [];
  public outputs: Point[] = [];
  private inputDotRefs: React.RefObject<HTMLSpanElement | null>[];
  private outputDotRefs: React.RefObject<HTMLSpanElement | null>[];

  constructor(props: ILargerBlockProps) {
    super(props);
    // Position dots for inputs - adjusted for larger block
    if (this.props.node.inputs.length === 1) {
      this.inputs = [new Point(-6, -30)];
    } else if (this.props.node.inputs.length === 2) {
      this.inputs = [new Point(-6, -20), new Point(-6, -40)];
    } else if (this.props.node.inputs.length === 3) {
      this.inputs = [
        new Point(-6, -15),
        new Point(-6, -30),
        new Point(-6, -45),
      ];
    }
    
    // Position dots for outputs - adjusted for larger block
    if (this.props.node.outputs.length === 1) {
      this.outputs = [new Point(24, -6)];
    } else if (this.props.node.outputs.length === 2) {
      this.outputs = [new Point(24, -6), new Point(40, -6)];
    } else if (this.props.node.outputs.length === 3) {
      this.outputs = [new Point(24, -6), new Point(40, -6), new Point(56, -6)];
    }
    
    this.inputDotRefs = this.inputs.map(() => createRef());
    this.outputDotRefs = this.outputs.map(() => createRef());
  }

  getIntendStyle = (indent: number) => {
    switch (indent) {
      case 0: return "h-auto flex flex-row ml-[4rem]";
      case 1: return "h-auto flex flex-row ml-[8rem]";
      case 2: return "h-auto flex flex-row ml-[12rem]";
      case 3: return "h-auto flex flex-row ml-[16rem]";
      case 4: return "h-auto flex flex-row ml-[20rem]";
      case 5: return "h-auto flex flex-row ml-[24rem]";
      case 6: return "h-auto flex flex-row ml-[28rem]";
      case 7: return "h-auto flex flex-row ml-[32rem]";
      case 8: return "h-auto flex flex-row ml-[36rem]";
      case 9: return "h-auto flex flex-row ml-[40rem]";
      case 10: return "h-auto flex flex-row ml-[44rem]";
      default: return "h-auto flex flex-row ml-[" + Number(20 + 4 * (indent - 4)).toString + "rem]";
    }
  };

  getNodeBg = (color: string) => {
    switch (color) {
      case "#86efac": return "bg-[#86efac]/50 border-[#86efac] ";
      case "#bef264": return "bg-[#bef264]/50 border-[#bef264] ";
      case "#fde047": return "bg-[#fde047]/50 border-[#fde047] ";
      case "#fdba74": return "bg-[#fdba74]/50 border-[#fdba74] ";
      case "#000000": return "bg-black border-white "; // Special case for black blocks
      default: return "bg-[#000000]/50 border-[#000000] ";
    }
  }

  componentDidMount() {
    this.updatePositions();
    window.addEventListener("resize", this.updatePositions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePositions);
  }

  updatePositions = () => {
    const newInputs = this.inputDotRefs.map((ref) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect)
        return new Point(rect.x + rect.width / 2, rect.y + rect.height / 2);
      else return new Point(0, 0);
    });
    const newOutputs = this.outputDotRefs.map((ref) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect)
        return new Point(rect.x + rect.width / 2, rect.y + rect.height / 2);
      else return new Point(0, 0);
    });
    this.props.onUpdatePoints(
      newInputs.map((point, index) => ({
        blockId: `${this.props.node.id}.${index + 1}`,
        updatedPoint: point,
      })),
      newOutputs.map((point, index) => ({
        blockId: `${this.props.node.id}.${index + 1}`,
        updatedPoint: point,
      }))
    );
  };

  render() {
    return (
      <div className={this.getIntendStyle(this.props.node.level)}>
        <div
          className={
            this.getNodeBg(this.props.node.color)
            + "border-2 rounded-xl m-2 inline-block align-middle w-auto relative overflow-visible "
            + "hover:border-orange-500 transition-colors duration-300 shadow-lg"
          }
          onClick={this.props.onClick}
        >
          {/* Larger text and more padding */}
          <div className="text-white text-3xl px-8 py-5 font-bold rounded-lg">
            {this.props.node.name}
          </div>
          
          {/* Output dots rendering - larger size */}
          <div className="absolute bottom-0 w-full flex justify-between px-1">
            {this.outputs.map((dot, index) => (
              <span
                ref={this.outputDotRefs[index]}
                key={index}
                className="bg-white rounded-full w-2.5 h-2.5" // Slightly smaller dots
                style={{
                  position: "absolute",
                  left: `${dot.x}px`,
                  bottom: `${dot.y}px`,
                }}
              ></span>
            ))}
          </div>
          
          {/* Input dots rendering - larger size */}
          <div className="absolute left-0 w-full flex justify-between px-1">
            {this.inputs.map((dot, index) => (
              <span
                ref={this.inputDotRefs[index]}
                key={index}
                className="bg-white rounded-full w-2.5 h-2.5" // Slightly smaller dots
                style={{
                  position: "absolute",
                  left: `${dot.x}px`,
                  top: `${dot.y}px`,
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}