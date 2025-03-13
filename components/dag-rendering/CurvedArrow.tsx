import React from "react";
import { Point } from "@/utils/types";

interface IArrowHeadProps {
  to: Point;
};

interface ILine {
  from: Point;
  to: Point;
}

interface ICurvedLine extends ILine {
  radius?: number;
}

const ArrowHead: React.FC<IArrowHeadProps> = ({ to }) => {
  const headLength = 10; // Length of the arrowhead (distance from base to tip)
  const headWidth = 5;   // Half the width of the arrowhead base

  // Define the size of the SVG canvas
  const width = headLength;
  const height = headWidth * 2;

  return (
    <svg width={width} height={height} style={{
        position: 'absolute',
        left: to.x - headLength,
        top: to.y - headWidth,
        pointerEvents: 'none', // Ensure the arrowhead doesn't block mouse events
      }}>
      <polygon points={`${width}, ${headWidth} 0, 0 0, ${height}`} fill="white" />
    </svg>
  );
};

export const CurvedArrow: React.FC<ILine> = ({ from, to }) => {
  // Validate coordinates
  const isValid = (point: Point) => point && point.x !== undefined && point.y !== undefined && point.x !== 0 && point.y !== 0;
  
  // If either point is invalid, don't render anything
  if (!isValid(from) || !isValid(to)) {
    return null;
  }
  
  // Check if direction is valid for our implementation (must be down and to the right)
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  if (deltaX <= 0 || deltaY <= 0) {
    return null;
  }
  
  return (
    <>
      <CurvedLine 
        from={from} 
        to={to}
      />
      <ArrowHead to={{ ...to }} />
    </>
  )
}

const CurvedLine: React.FC<ICurvedLine> = ({
  from,
  to,
}) => {
  const strokeColor = 'white'; // Color of the line
  const strokeWidth = 2; // Width of the line
  const fixedRadius = 20; // Fixed radius for the curve

  // Calculate the differences in x and y
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  
  // We don't need this check anymore as it's handled in the parent component
  // The parent CurvedArrow component should have already validated these cases

  // Adjust the radius if necessary
  const radius = Math.min(fixedRadius, deltaX, deltaY);

  // Starting point (from)
  const startX = from.x;
  const startY = from.y;

  // Vertical line end point (where the arc begins)
  const vertLineEndX = startX;
  const vertLineEndY = to.y - radius;

  // Arc end point (where the horizontal line begins)
  const arcEndX = startX + radius;
  const arcEndY = to.y;

  // Path definition using SVG path commands
  const pathData = `
    M ${startX} ${startY}
    L ${vertLineEndX} ${vertLineEndY}
    A ${radius} ${radius} 0 0 0 ${arcEndX} ${arcEndY}
    L ${to.x} ${to.y}
  `;

  // Calculate SVG boundaries to prevent clipping
  const minX = startX - strokeWidth;
  const minY = startY - strokeWidth;
  const maxX = Math.max(startX + radius, to.x) + strokeWidth;
  const maxY = Math.max(to.y, startY) + strokeWidth;

  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      style={{ position: 'absolute', left: minX, top: minY }}
    >
      <path
        d={pathData}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};