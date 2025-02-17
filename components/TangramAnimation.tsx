import React, { useRef, useEffect } from "react";

interface TangramAnimationProps {
  scale?: number;
  xOffset?: number;
  yOffset?: number;
  className?: string;
}

export default function TangramAnimation({
  scale = 2,
  xOffset = 0,
  yOffset = 0,
  className = "",
}: TangramAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 800;
    const height = 600;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

     // ── (Optional) Grid Drawing ──
    // function drawGrid(
    //     ctx: CanvasRenderingContext2D,
    //     w: number,
    //     h: number,
    //     step = 50
    //   ) {
    //     ctx.save();
    //     ctx.strokeStyle = "rgba(0,0,0,0.1)";
    //     ctx.beginPath();
    //     for (let x = 0; x <= w; x += step) {
    //       ctx.moveTo(x, 0);
    //       ctx.lineTo(x, h);
    //     }
    //     for (let y = 0; y <= h; y += step) {
    //       ctx.moveTo(0, y);
    //       ctx.lineTo(w, y);
    //     }
    //     ctx.stroke();
  
    //     ctx.fillStyle = "rgba(0,0,0,0.6)";
    //     ctx.font = "10px sans-serif";
    //     for (let x = 0; x <= w; x += step) {
    //       ctx.fillText(`${x}`, x + 2, 10);
    //     }
    //     for (let y = 0; y <= h; y += step) {
    //       ctx.fillText(`${y}`, 2, y - 2);
    //     }
    //     ctx.restore();
    // }

    // ── Cubic Bezier Easing Function ──
    function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
      const cx = 3 * p1x;
      const bx = 3 * (p2x - p1x) - cx;
      const ax = 1 - cx - bx;

      const cy = 3 * p1y;
      const by = 3 * (p2y - p1y) - cy;
      const ay = 1 - cy - by;

      function sampleCurveX(t: number) {
        return ((ax * t + bx) * t + cx) * t;
      }
      function sampleCurveY(t: number) {
        return ((ay * t + by) * t + cy) * t;
      }
      function sampleCurveDerivativeX(t: number) {
        return (3 * ax * t + 2 * bx) * t + cx;
      }
      function solveCurveX(x: number, epsilon = 1e-6) {
        let t = x;
        for (let i = 0; i < 8; i++) {
          const xEst = sampleCurveX(t) - x;
          if (Math.abs(xEst) < epsilon) return t;
          const dEst = sampleCurveDerivativeX(t);
          if (Math.abs(dEst) < 1e-6) break;
          t -= xEst / dEst;
        }
        return t;
      }
      function solve(x: number, epsilon?: number) {
        return sampleCurveY(solveCurveX(x, epsilon));
      }
      return solve;
    }

    // Example custom easing
    const ease = cubicBezier(0.9, -0.02, 0, 1.06);

    // ── Tangram Pieces and Colors ──
    const tangramColors = [
        "#A4CF62", // small triangle (top-left)
        "#9ED3B2", // square (left)
        "#F59B45", // large triangle (top)
        "#FCE18B", // large triangle (right)
        "#E94A3E", // large triangle (bottom-left)
        "#4B9443", // medium triangle (center)
        "#1E5A3E", // parallelogram (bottom-center)
    ];

    const tangramPieces = [
      {
        points: [
          [0, 0],
          [50 * Math.sqrt(2), 0],
          [0, 50 * Math.sqrt(2)],
        ],
        color: tangramColors[0],
      },
      {
        points: [
          [0, 0],
          [50 * Math.sqrt(2), 0],
          [0, 50 * Math.sqrt(2)],
        ],
        color: tangramColors[1],
      },
      {
        points: [
          [0, 0],
          [50, 0],
          [0, 50],
        ],
        color: tangramColors[2],
      },
      {
        points: [
          [0, 0],
          [25 * Math.sqrt(2), 0],
          [0, 25 * Math.sqrt(2)],
        ],
        color: tangramColors[3],
      },
      {
        points: [
          [0, 0],
          [25 * Math.sqrt(2), 0],
          [0, 25 * Math.sqrt(2)],
        ],
        color: tangramColors[4],
      },
      {
        points: [
          [0, 0],
          [25 * Math.sqrt(2), 0],
          [25 * Math.sqrt(2), 25 * Math.sqrt(2)],
          [0, 25 * Math.sqrt(2)],
        ],
        color: tangramColors[5],
      },
      {
        points: [
          [0, 0],
          [50, 0],
          [75, 25],
          [25, 25],
        ],
        color: tangramColors[6],
      },
    ];

    // ── Each piece’s state includes flipX/flipY plus “currentScaleX/scaleY” ──
    const piecesState = tangramPieces.map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      rotation: Math.random() * 360,
      // The final target flip booleans
      flipX: false,
      flipY: false,
      // The current numeric scale factors (interpolated each frame)
      scaleX: 1,
      scaleY: 1,
      // The final target positions/rotation/scales
      targetX: 0,
      targetY: 0,
      targetRotation: 0,
      targetFlipX: false,
      targetFlipY: false,
    }));

    // ── Tangram Arrangements ──
    const arrangementSquare = [
      { x: 70, y: 70, rotation: -45, flipX: true, flipY: true },
      { x: 70, y: 70, rotation: 135, flipX: true, flipY: false },
      { x: 120, y: 120, rotation: 90, flipX: true, flipY: false },
      { x: 70, y: 70, rotation: -135, flipX: true, flipY: true },
      { x: 95, y: 45, rotation: -45, flipX: false, flipY: false },
      { x: 95, y: 45, rotation: 45, flipX: false, flipY: false },
      { x: 20, y: 120, rotation: 0, flipX: false, flipY: true },
    ];

    const arrangementBird = [
      { x: 110, y: 4.5, rotation: 0, flipX: false, flipY: false },
      { x: 110, y: 75, rotation: 0, flipX: true, flipY: true },
      { x: 75, y: 40, rotation: 45, flipX: true, flipY: false },
      { x: 40, y: 40, rotation: 180, flipX: false, flipY: false },
      { x: 75, y: 75, rotation: 0, flipX: true, flipY: false },
      { x: 75, y: 75, rotation: 0, flipX: false, flipY: false },
      { x: 146, y: 146, rotation: 45, flipX: true, flipY: false },
    ];

    const arrangementMountain = [
        { x: 75, y: 100, rotation: 0, flipX: true, flipY: true },
        { x: 145.5, y: 100, rotation: 0, flipX: false, flipY: true },
        { x: 110, y: 64.5, rotation: 135, flipX: true, flipY: true },
        { x: 75, y: 100, rotation: -90, flipX: false, flipY: false },
        { x: 110.5, y: 100, rotation: 180, flipX: true, flipY: false },
        { x: 110, y: 14.5, rotation: 45, flipX: false, flipY: false },
        { x: 110.5, y: 100, rotation: 45, flipX: true, flipY: true },
    ];
  
    const arrangementCamel = [
        { x: 105, y: 105, rotation: -45, flipX: true, flipY: true },
        { x: 150, y: 80, rotation: 180, flipX: false, flipY: true },
        { x: 115, y: 45, rotation: -135, flipX: true, flipY: true },
        { x: 30, y: 30, rotation: -45, flipX: false, flipY: false },
        { x: 30, y: 30, rotation: 45+180, flipX: false, flipY: false },
        { x: 80, y: 30, rotation: 45, flipX: false, flipY: false },
        { x: 30, y: 30, rotation: 90, flipX: false, flipY: true },
    ];

    // For demonstration, just two shapes
    const shapes = [arrangementSquare, arrangementCamel, arrangementBird, arrangementMountain, arrangementCamel];
    let currentShapeIndex = 0;

    function setTargetsToArrangement(arr: {x: number, y: number, rotation: number, flipX: boolean, flipY: boolean}[]) {
      for (let i = 0; i < piecesState.length; i++) {
        piecesState[i].targetX = arr[i].x * scale + xOffset;
        piecesState[i].targetY = arr[i].y * scale + yOffset;
        piecesState[i].targetRotation = arr[i].rotation;
        piecesState[i].targetFlipX = arr[i].flipX;
        piecesState[i].targetFlipY = arr[i].flipY;
      }
    }

    // Start with the first arrangement
    setTargetsToArrangement(shapes[currentShapeIndex]);

    // ── Transition Variables ──
    const transitionDuration = 3000;
    let transitionStartTime = performance.now();

    // Save initial state (including booleans for flipping).
    let transitionStartStates = piecesState.map((ps) => ({
      x: ps.x,
      y: ps.y,
      rotation: ps.rotation,
      flipX: ps.flipX,
      flipY: ps.flipY,
      scaleX: ps.scaleX,
      scaleY: ps.scaleY,
    }));

    // ── Pause Settings ──
    const pauseDuration = 1000; // ms
    let isPaused = false;
    let pauseStartTime = 0;

    // ── Update ──
    function update() {
      const now = performance.now();

      // If we're currently paused, check whether we've waited long enough
      if (isPaused) {
        if (now - pauseStartTime >= pauseDuration) {
          // Time to unpause and start next transition
          isPaused = false;
          transitionStartTime = performance.now(); // reset for next transition
        } else {
          // Still paused; do nothing
          return;
        }
      }

      let progress = (now - transitionStartTime) / transitionDuration;
      if (progress > 1) progress = 1;
      const easedProgress = ease(progress);

      for (let i = 0; i < piecesState.length; i++) {
        const init = transitionStartStates[i];
        const piece = piecesState[i];

        // 1) Interpolate position
        piece.x = init.x + (piece.targetX - init.x) * easedProgress;
        piece.y = init.y + (piece.targetY - init.y) * easedProgress;

        // 2) Interpolate rotation
        const startRot = init.rotation;
        const endRot = piece.targetRotation;
        let diff = (endRot - startRot + 360) % 360;
        if (diff > 180) diff -= 360;
        piece.rotation = startRot + diff * easedProgress;

        // 3) Interpolate flip => numeric scale factor
        const oldSx = init.flipX ? -1 : 1;
        const newSx = piece.targetFlipX ? -1 : 1;
        piece.scaleX = oldSx + (newSx - oldSx) * easedProgress;

        const oldSy = init.flipY ? -1 : 1;
        const newSy = piece.targetFlipY ? -1 : 1;
        piece.scaleY = oldSy + (newSy - oldSy) * easedProgress;
      }

      // If transition just finished
      if (progress >= 1) {
        // Pause
        isPaused = true;
        pauseStartTime = now;

        // Save final states
        transitionStartStates = piecesState.map((ps) => ({
          x: ps.x,
          y: ps.y,
          rotation: ps.rotation,
          flipX: ps.targetFlipX,
          flipY: ps.targetFlipY,
          scaleX: ps.scaleX,
          scaleY: ps.scaleY,
        }));

        // Schedule the next arrangement
        currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
        setTargetsToArrangement(shapes[currentShapeIndex]);
      }
    }

    // ── Draw ──
    function drawPiece(piece: { points: number[][]; color: string }, state: { x: number; y: number; rotation: number; scaleX: number; scaleY: number }) {
        if(!ctx) return;
      ctx.save();
      ctx.translate(state.x, state.y);
      ctx.rotate((state.rotation * Math.PI) / 180);
      // Multiply the user-provided scale by the flip scale
      ctx.scale(state.scaleX * scale, state.scaleY * scale);

      const pts = piece.points;
      ctx.beginPath();
      ctx.fillStyle = piece.color;
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
      ctx.closePath();

      ctx.shadowColor = "rgba(0,0,0,0.2)";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }

    function loop() {
        if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
    //   drawGrid(ctx, width, height, 50);
      update();

      // Draw every piece in the new positions
      for (let i = 0; i < tangramPieces.length; i++) {
        drawPiece(tangramPieces[i], piecesState[i]);
      }
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(loop as unknown as number);
    };
  }, [scale, xOffset, yOffset]);

  return (
      <canvas ref={canvasRef} width={800} height={800} className={`${className}`} />
  );
}