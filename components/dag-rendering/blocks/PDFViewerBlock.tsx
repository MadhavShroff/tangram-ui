import React, { createRef, useState } from "react";
import { Node, Point } from "@/utils/types";

interface IPDFViewerBlockProps {
  node: Node;
  onClick: () => void;
  onUpdatePoints: (
    inputs: { blockId: string; updatedPoint: Point }[],
    outputs: { blockId: string; updatedPoint: Point }[]
  ) => void;
  pdfUrl?: string;
  onDownload?: () => void;
}

/**
 * PDFViewerBlock component - a specialized Block with PDF preview
 * Used for displaying PDF outputs from modules
 */
export default class PDFViewerBlock extends React.Component<IPDFViewerBlockProps> {
  public inputs: Point[] = [];
  public outputs: Point[] = [];
  private inputDotRefs: React.RefObject<HTMLSpanElement | null>[];
  private outputDotRefs: React.RefObject<HTMLSpanElement | null>[];
  public state = {
    isExpanded: false
  };

  constructor(props: IPDFViewerBlockProps) {
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

  toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.setState(prev => ({ isExpanded: !prev.isExpanded }), this.updatePositions);
  };

  render() {
    const { pdfUrl = "https://arxiv.org/pdf/2503.20783", onDownload } = this.props;
    const { isExpanded } = this.state;
    
    return (
      <div className={this.getIntendStyle(this.props.node.level)}>
        <div
          className={
            this.getNodeBg(this.props.node.color)
            + "border-2 rounded-xl m-2 inline-block align-middle min-w-[250px] relative overflow-visible "
            + "hover:border-orange-500 transition-colors duration-300"
          }
          onClick={this.props.onClick}
        >
          <div className="text-white text-xl font-bold px-4 pt-3 flex justify-between items-center">
            <span>{this.props.node.name}</span>
            {pdfUrl && (
              <button 
                className="text-xs bg-white/20 hover:bg-white/30 rounded px-2 py-1"
                onClick={this.toggleExpanded}
              >
                {isExpanded ? "Collapse" : "Expand"}
              </button>
            )}
          </div>
          
          {/* PDF Viewer content */}
          <div className="p-3 pt-2">
            {isExpanded ? (
              // Expanded view with embedded PDF
              <div className="relative w-full" style={{ height: "400px" }}>
                <iframe 
                  src={pdfUrl}
                  className="absolute top-0 left-0 w-full h-full border-0 rounded"
                  title="PDF Viewer"
                />
              </div>
            ) : (
              // Collapsed view with thumbnail
              <div className="bg-black/30 border border-white/20 rounded-lg p-2 w-full h-40 flex flex-col items-center justify-center">
                {pdfUrl ? (
                  <>
                    {/* PDF preview thumbnail */}
                    <div className="w-24 h-32 mb-2 bg-white/10 rounded flex items-center justify-center relative overflow-hidden">
                      {/* PDF icon */}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-white absolute"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M9 15h6"></path>
                        <path d="M9 11h6"></path>
                      </svg>
                      
                      {/* Tiny PDF preview */}
                      <img 
                        src={`https://api.microlink.io/?url=${encodeURIComponent(pdfUrl)}&screenshot=true&meta=false&embed=screenshot.url`}
                        alt="PDF Thumbnail"
                        className="w-full h-full object-cover opacity-20"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <button 
                        className="bg-white/10 hover:bg-white/20 text-white text-xs py-1 px-3 rounded"
                        onClick={this.toggleExpanded}
                      >
                        View
                      </button>
                      
                      <button 
                        className="bg-white/10 hover:bg-white/20 text-white text-xs py-1 px-3 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          // If onDownload is provided, use it; otherwise open PDF in new tab
                          if (onDownload) {
                            onDownload();
                          } else {
                            window.open(pdfUrl, '_blank');
                          }
                        }}
                      >
                        Download
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-white/50 text-sm">
                    No PDF generated yet
                  </div>
                )}
              </div>
            )}
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