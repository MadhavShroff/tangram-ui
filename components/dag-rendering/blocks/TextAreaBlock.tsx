import React, { createRef } from "react";
import { Node, Point } from "@/utils/types";

interface ITextAreaBlockProps {
  node: Node;
  onClick: () => void;
  onUpdatePoints: (
    inputs: { blockId: string; updatedPoint: Point }[],
    outputs: { blockId: string; updatedPoint: Point }[]
  ) => void;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

interface ITextAreaBlockState {
  isExpanded: boolean;
}

/**
 * TextAreaBlock component - a specialized Block with a text area input
 * Used for entering text content like markdown or code
 */
export default class TextAreaBlock extends React.Component<ITextAreaBlockProps, ITextAreaBlockState> {
  public inputs: Point[] = [];
  public outputs: Point[] = [];
  private inputDotRefs: React.RefObject<HTMLSpanElement | null>[];
  private outputDotRefs: React.RefObject<HTMLSpanElement | null>[];
  private wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props: ITextAreaBlockProps) {
    super(props);
    this.state = {
      isExpanded: false
    };
    
    this.wrapperRef = React.createRef();
    
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
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePositions);
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  
  componentDidUpdate(prevProps: ITextAreaBlockProps, prevState: ITextAreaBlockState) {
    // If expansion state changed, update positions
    if (prevState.isExpanded !== this.state.isExpanded) {
      this.updatePositions();
    }
  }
  
  handleClickOutside = (event: MouseEvent) => {
    if (
      this.state.isExpanded && 
      this.wrapperRef.current && 
      !this.wrapperRef.current.contains(event.target as Node)
    ) {
      this.setState({ isExpanded: false }, this.updatePositions);
    }
  }
  
  handleFocus = () => {
    if (!this.state.isExpanded) {
      this.setState({ isExpanded: true }, this.updatePositions);
    }
  }
  
  handleBlur = (e: React.FocusEvent) => {
    // Only collapse if focus is not moving to another element within this component
    if (!this.wrapperRef.current?.contains(e.relatedTarget as Node)) {
      this.setState({ isExpanded: false }, this.updatePositions);
    }
  }

  updatePositions = () => {
    // We use setTimeout to ensure the DOM has updated with the expanded state
    // before we try to get the new positions
    setTimeout(() => {
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
    }, 10);
  };

  render() {
    const { value = "", onChange, placeholder = "Enter text here..." } = this.props;
    const { isExpanded } = this.state;
    
    return (
      <div className={this.getIntendStyle(this.props.node.level)}>
        <div
          ref={this.wrapperRef}
          className={`
            ${this.getNodeBg(this.props.node.color)}
            border-2 rounded-xl m-2 inline-block align-middle relative overflow-visible 
            hover:border-orange-500 transition-all duration-300 ease-in-out
            ${isExpanded 
              ? 'fixed top-1/4 left-[10%] w-[80%] h-[50%] z-50' 
              : 'min-w-[250px]'
            }
          `}
          onClick={this.props.onClick}
        >
          <div className="text-white text-xl font-bold px-4 pt-3">
            {this.props.node.name}
          </div>
          
          {/* Text Area content */}
          <div className={`p-3 pt-2 ${isExpanded ? 'h-[calc(100%-4rem)]' : ''}`}>
            <textarea
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              placeholder={placeholder}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              className={`
                bg-black/30 text-white border border-white/20 rounded p-2 text-sm 
                focus:outline-none focus:border-white/40 transition-all duration-300 ease-in-out
                ${isExpanded 
                  ? 'w-full h-full resize-vertical'
                  : 'w-full h-24 resize-none'
                }
              `}
              onClick={(e) => e.stopPropagation()} // Prevent block click when interacting with textarea
            />
          </div>
          
          {/* Output dots rendering - keep visible when expanded */}
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
          
          {/* Input dots rendering - keep visible when expanded */}
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
          
          {/* Add an overlay when expanded to create a backdrop effect */}
          {isExpanded && (
            <div 
              className="fixed inset-0 bg-black/50 -z-10" 
              style={{ pointerEvents: 'none' }}
            />
          )}
        </div>
      </div>
    );
  }
}