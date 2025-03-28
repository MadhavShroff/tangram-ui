import React, { createRef } from "react";
import { Node, Point } from "@/utils/types";

interface IOptionsBlockProps {
  node: Node;
  onClick: () => void;
  onUpdatePoints: (
    inputs: { blockId: string; updatedPoint: Point }[],
    outputs: { blockId: string; updatedPoint: Point }[]
  ) => void;
  options?: { value: string; label: string }[];
  selectedValue?: string;
  onOptionChange?: (value: string) => void;
}

/**
 * OptionsBlock component - a specialized Block for option selections
 * Displays radio button options inside the block
 */
export default class OptionsBlock extends React.Component<IOptionsBlockProps> {
  public inputs: Point[] = [];
  public outputs: Point[] = [];
  private inputDotRefs: React.RefObject<HTMLSpanElement | null>[];
  private outputDotRefs: React.RefObject<HTMLSpanElement | null>[];

  constructor(props: IOptionsBlockProps) {
    super(props);
    // Position dots for inputs
    if (this.props.node.inputs.length === 1) {
      this.inputs = [new Point(-5, -20)];
    } else if (this.props.node.inputs.length === 2) {
      this.inputs = [new Point(-5, -15), new Point(-5, -25)];
    } else if (this.props.node.inputs.length === 3) {
      this.inputs = [
        new Point(-5, -10),
        new Point(-5, -20),
        new Point(-5, -30),
      ];
    }
    
    // Position dots for outputs
    if (this.props.node.outputs.length === 1) {
      this.outputs = [new Point(18, -5)];
    } else if (this.props.node.outputs.length === 2) {
      this.outputs = [new Point(18, -5), new Point(30, -5)];
    } else if (this.props.node.outputs.length === 3) {
      this.outputs = [new Point(18, -5), new Point(30, -5), new Point(42, -5)];
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
    // Default options if none provided
    const defaultOptions = [
      { value: "minimal", label: "Minimal" },
      { value: "standard", label: "Standard" },
      { value: "advanced", label: "Advanced" }
    ];
    
    const { 
      options = defaultOptions, 
      selectedValue = "standard", 
      onOptionChange 
    } = this.props;
    
    return (
      <div className={this.getIntendStyle(this.props.node.level)}>
        <div
          className={
            this.getNodeBg(this.props.node.color)
            + "border-2 rounded-xl m-2 inline-block align-middle min-w-[200px] relative overflow-visible "
            + "hover:border-orange-500 transition-colors duration-300"
          }
          onClick={this.props.onClick}
        >
          <div className="text-white text-xl font-bold px-4 pt-3">
            {this.props.node.name}
          </div>
          
          {/* Options content */}
          <div className="p-3 pt-2">
            <div className="space-y-2">
              {options.map((option) => (
                <label 
                  key={option.value} 
                  className="flex items-center px-1 py-0.5 text-white text-sm cursor-pointer hover:bg-white/10 rounded"
                >
                  <input
                    type="radio"
                    name={`${this.props.node.id}-options`}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={(e) => {
                      e.stopPropagation();
                      onOptionChange && onOptionChange(option.value);
                    }}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
          
          {/* Output dots rendering */}
          <div className="absolute bottom-0 w-full flex justify-between px-1">
            {this.outputs.map((dot, index) => (
              <span
                ref={this.outputDotRefs[index]}
                key={index}
                className="bg-white rounded-full w-2 h-2"
                style={{
                  position: "absolute",
                  left: `${dot.x}px`,
                  bottom: `${dot.y}px`,
                }}
              ></span>
            ))}
          </div>
          
          {/* Input dots rendering */}
          <div className="absolute left-0 w-full flex justify-between px-1">
            {this.inputs.map((dot, index) => (
              <span
                ref={this.inputDotRefs[index]}
                key={index}
                className="bg-white rounded-full w-2 h-2"
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