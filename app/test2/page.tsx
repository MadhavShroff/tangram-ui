"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface VoiceRecordingAnimationProps {
  onRecordingChange?: (recording: boolean) => void;
}

const VoiceRecordingAnimation: React.FC<VoiceRecordingAnimationProps> = ({ 
  onRecordingChange 
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  // Volume state is used in updateBorderGlow
  const [volume, setVolume] = useState<number>(0);
  
  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const micButtonRef = useRef<HTMLButtonElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const orangeCircleRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation control
  const borderSegmentsRef = useRef<HTMLDivElement[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Create border segments for the spreading effect
  useEffect(() => {
    if (borderRef.current) {
      // Clear any existing segments
      borderRef.current.innerHTML = '';
      borderSegmentsRef.current = [];
      
      // Create 50 segments for the border
      const segmentCount = 50;
      for (let i = 0; i < segmentCount; i++) {
        const segment = document.createElement('div');
        segment.className = 'h-full bg-white transition-all duration-300';
        segment.style.width = `${100 / segmentCount}%`;
        segment.style.display = 'inline-block';
        borderRef.current.appendChild(segment);
        borderSegmentsRef.current.push(segment as HTMLDivElement);
      }
    }
    
    // Cleanup function
    return () => {
      if (borderRef.current) {
        borderRef.current.innerHTML = '';
      }
      borderSegmentsRef.current = [];
    };
  }, []);
  
  // Initialize mic button and orange circle
  useEffect(() => {
    if (micButtonRef.current && orangeCircleRef.current) {
      // Initial state of orange circle (hidden inside mic button)
      gsap.set(orangeCircleRef.current, {
        scale: 0,
        opacity: 0,
        x: 0,
        y: 0,
        transformOrigin: 'center center'
      });
    }
  }, []);
  
  // Start recording and animation
  const startRecording = async () => {
    try {
      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      
      // Set up audio analyzer
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      // Monitor audio volume
      analyzeAudio();
      
      setIsRecording(true);
      onRecordingChange?.(true);
      
      // Start animation sequence
      animateRecordingStart();
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };
  
  // Stop recording and animation
  const stopRecording = () => {
    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Cancel animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setIsRecording(false);
    onRecordingChange?.(false);
    
    // Reverse animation
    animateRecordingStop();
  };
  
  // Analyze audio for volume level
  const analyzeAudio = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateVolume = () => {
      if (!isRecording || !analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avgVolume = Math.min(1, sum / dataArray.length / 128);
      setVolume(avgVolume);
      
      // Update border glow based on volume
      updateBorderGlow(avgVolume);
      
      animationFrameRef.current = requestAnimationFrame(updateVolume);
    };
    
    updateVolume();
  };
  
  // Handle mic button click
  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  // Update border glow based on volume
  const updateBorderGlow = (volumeLevel: number) => {
    const minIntensity = 3;
    const maxIntensity = 20;
    const intensity = minIntensity + (maxIntensity - minIntensity) * volumeLevel;
    
    // Apply glow to all border segments
    borderSegmentsRef.current.forEach(segment => {
      if (segment.classList.contains('active')) {
        segment.style.boxShadow = `0 0 ${intensity}px ${intensity / 2}px rgba(255, 165, 0, 0.8)`;
      }
    });
  };
  
  // Animation for recording start
  const animateRecordingStart = () => {
    if (!micButtonRef.current || !orangeCircleRef.current || !borderRef.current) return;
    
    // Calculate positions
    const micRect = micButtonRef.current.getBoundingClientRect();
    const borderRect = borderRef.current.getBoundingClientRect();
    
    // Find the center point of mic button
    const micCenterX = micRect.left + micRect.width / 2;
    const micCenterY = micRect.top + micRect.height / 2;
    
    // Calculate the point where circle should meet the border
    // This should be directly below the mic button
    const impactPointX = micCenterX;
    const impactPointY = borderRect.top;
    
    // Calculate which border segment will be hit
    const segmentWidth = borderRect.width / borderSegmentsRef.current.length;
    const impactSegmentIndex = Math.floor((impactPointX - borderRect.left) / segmentWidth);
    
    // Create timeline for animation
    const tl = gsap.timeline();
    
    // 1. Orange circle emerges from mic button
    tl.to(micButtonRef.current, {
      backgroundColor: '#ff9900',
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(orangeCircleRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '<')
    
    // 2. Circle moves downward to the border
    .to(orangeCircleRef.current, {
      y: impactPointY - micCenterY,
      duration: 0.8,
      ease: 'power3.inOut'
    })
    
    // 3. Circle merges with border and disappears
    .to(orangeCircleRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        // Start the spreading effect from the impact point
        spreadBorderColor(impactSegmentIndex);
      }
    });
  };
  
  // Animation for recording stop
  const animateRecordingStop = () => {
    // Reset all border segments
    borderSegmentsRef.current.forEach(segment => {
      gsap.to(segment, {
        backgroundColor: '#ffffff',
        boxShadow: 'none',
        duration: 0.5,
        ease: 'power2.inOut'
      });
      segment.classList.remove('active');
    });
    
    // Reset mic button
    if (micButtonRef.current) {
      gsap.to(micButtonRef.current, {
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    // Reset orange circle
    if (orangeCircleRef.current) {
      gsap.set(orangeCircleRef.current, {
        scale: 0,
        opacity: 0,
        x: 0,
        y: 0
      });
    }
  };
  
  // Create spreading effect from impact point
  const spreadBorderColor = (startIndex: number) => {
    const segments = borderSegmentsRef.current;
    if (!segments.length) return;
    
    // Function to activate a segment with delay based on distance
    const activateSegment = (index: number, delay: number) => {
      if (index >= 0 && index < segments.length) {
        setTimeout(() => {
          if (!isRecording) return; // Stop if recording stopped
          
          // Activate segment
          segments[index].style.backgroundColor = '#ff9900';
          segments[index].classList.add('active');
          
          // Add initial glow
          segments[index].style.boxShadow = '0 0 10px 3px rgba(255, 165, 0, 0.8)';
        }, delay);
      }
    };
    
    // Speed factor for animation (ms per segment)
    const speedFactor = 25; // ms per segment
    
    // Activate segments in both directions from impact point
    for (let i = 0; i < segments.length; i++) {
      const distance = Math.abs(i - startIndex);
      const delay = distance * speedFactor;
      activateSegment(i, delay);
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-gray-900 flex flex-col justify-between items-center overflow-hidden"
    >
      {/* Mic button container */}
      <div className="flex justify-center items-center h-full">
        {/* Mic button */}
        <button
          ref={micButtonRef}
          onClick={handleMicClick}
          className="relative w-16 h-16 rounded-full flex items-center justify-center border-2 border-white transition-colors hover:bg-orange-500"
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
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
            className="text-white"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        </button>
        
        {/* Orange circle that animates */}
        <div 
          ref={orangeCircleRef}
          className="absolute w-8 h-8 rounded-full bg-orange-500 pointer-events-none"
          style={{ 
            left: micButtonRef.current ? micButtonRef.current.getBoundingClientRect().left + micButtonRef.current.offsetWidth/2 - 16 : 0,
            top: micButtonRef.current ? micButtonRef.current.getBoundingClientRect().top + micButtonRef.current.offsetHeight/2 - 16 : 0
          }}
        />
      </div>
      
      {/* Status indicator */}
      {isRecording && (
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white">Recording</span>
        </div>
      )}
      
      {/* Border at bottom (container for segments) */}
      <div 
        ref={borderRef}
        className="w-full h-2 flex justify-start items-center overflow-hidden"
        role="status"
      />
    </div>
  );
};

export default VoiceRecordingAnimation;