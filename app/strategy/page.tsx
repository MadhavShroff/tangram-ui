"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AIConsultingCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : prev - 1));
  };

  // Strategy Slide Content
  const StrategySlide = () => (
    <div className="bg-black h-screen text-white p-10 font-sans">
      {/* STRATEGY SECTION */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 md:mb-6">STRATEGY</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">01</div>
            <p className="text-sm leading-snug">
              Position MakeItAiFor.Me for small businesses with 10 to 100 employees seeking accessible AI solutions
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">02</div>
            <p className="text-sm leading-snug">
              Deliver ready-to-implement AI tools with clear ROI and minimal technical overhead
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">03</div>
            <p className="text-sm leading-snug">
              Generate revenue through initial consultation and ongoing implementation services
            </p>
          </div>
        </div>
      </div>

      {/* COMPETITIVE ADVANTAGES SECTION */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 md:mb-6">COMPETITIVE ADVANTAGES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">01</div>
            <p className="text-sm leading-snug">
              Simplified AI onboarding that doesn't require clients to hire technical specialists
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">02</div>
            <p className="text-sm leading-snug">
              Small enough to move quickly, large enough to provide reliable ongoing support
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">03</div>
            <p className="text-sm leading-snug">
              Focus on SMB-specific use cases overlooked by both enterprise vendors and self-service tools
            </p>
          </div>
        </div>
      </div>

      {/* HYPOTHESES SECTION */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 md:mb-6">HYPOTHESES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">01</div>
            <p className="text-sm leading-snug">
              Small businesses want AI benefits but lack time, expertise and budget for custom development
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">02</div>
            <p className="text-sm leading-snug">
              Will pay $2K-$3K for initial 3-month consultation + $500-$1K/month for implementation
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">03</div>
            <p className="text-sm leading-snug">
              Industry-specific solutions create referral networks and reduce customer acquisition costs
            </p>
          </div>
        </div>
      </div>

      {/* EXAMPLES SECTION */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 md:mb-6">EXAMPLES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2 md:mb-3">
              <div className="text-4xl md:text-5xl text-gray-600 font-light mr-2 md:mr-3">01</div>
              <p className="text-sm text-gray-400">Local Law Firm</p>
            </div>
            
            <div className="bg-gray-800 p-3 md:p-4 mb-2 md:mb-3 rounded">
              <p className="text-sm text-center">Need AI to automate document review and client intake</p>
            </div>
            
            <p className="text-xs text-gray-400">$3K consultation + $750/month implementation = $12K first year</p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2 md:mb-3">
              <div className="text-4xl md:text-5xl text-gray-600 font-light mr-2 md:mr-3">02</div>
              <p className="text-sm text-gray-400">Communications Agency</p>
            </div>
            
            <div className="bg-gray-800 p-3 md:p-4 mb-2 md:mb-3 rounded">
              <p className="text-sm text-center">Need integrated AI tools for ESG reporting and stakeholder engagement</p>
            </div>
            
            <p className="text-xs text-gray-400">$3K consultation + $1K/month implementation = $15K first year</p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2 md:mb-3">
              <div className="text-4xl md:text-5xl text-gray-600 font-light mr-2 md:mr-3">03</div>
              <p className="text-sm text-gray-400">Real Estate Agency</p>
            </div>
            
            <div className="bg-gray-800 p-3 md:p-4 mb-2 md:mb-3 rounded">
              <p className="text-sm text-center">Need AI tools for lead qualification and property matching</p>
            </div>
            
            <p className="text-xs text-gray-400">$2K consultation + $500/month implementation = $8K first year</p>
          </div>
        </div>
      </div>

      {/* BOTTOM PROJECTION */}
      <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="text-gray-400 text-sm mb-2 md:mb-0">75 clients × ~$9K ARR → $675K ARR → $3-4M valuation</div>
        <div className="text-gray-500 text-left md:text-right text-xs tracking-widest">MAKEITAIFOR.ME</div>
      </div>
    </div>
  );

  // Process Slide Content
  const ProcessSlide = () => (
    <div className="bg-black h-screen text-white p-4 sm:p-8 md:p-12 lg:p-16 font-sans">
      {/* PROCESS OVERVIEW SECTION */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 md:mb-6">PROCESS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">01</div>
            <p className="text-sm leading-snug">
              Onboarding and discovery sessions to identify pain points and automation opportunities
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">02</div>
            <p className="text-sm leading-snug">
              Investigation of existing workflows to determine automation feasibility and ROI
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">03</div>
            <p className="text-sm leading-snug">
              Testing and validation of AI solutions with client teams to ensure adoption
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">04</div>
            <p className="text-sm leading-snug">
              Delivery and ongoing support to ensure solutions continue to deliver value
            </p>
          </div>
        </div>
      </div>

      {/* INVESTIGATION PHASE SECTION */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 md:mb-6">INVESTIGATION PHASE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">01</div>
            <p className="text-sm leading-snug">
              Process mapping to identify bottlenecks and manual tasks that consume significant staff time
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">02</div>
            <p className="text-sm leading-snug">
              Data flow analysis to determine what information exists and how it can be leveraged by AI
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">03</div>
            <p className="text-sm leading-snug">
              Cost-benefit prioritization to focus on high-impact, low-implementation-barrier solutions first
            </p>
          </div>
        </div>
      </div>

      {/* TESTING & VALIDATION SECTION */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 md:mb-6">TESTING & VALIDATION</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">01</div>
            <p className="text-sm leading-snug">
              Proof of concept deployments with real business data to demonstrate tangible outcomes
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">02</div>
            <p className="text-sm leading-snug">
              User feedback loops to refine solutions and adapt to specific business contexts
            </p>
          </div>
          
          <div className="mb-4 md:mb-0">
            <div className="text-4xl md:text-5xl text-gray-600 font-light mb-2 md:mb-4">03</div>
            <p className="text-sm leading-snug">
              Success metrics tracking to quantify time saved, error reduction, and revenue impact
            </p>
          </div>
        </div>
      </div>

      {/* CASE STUDY SECTION */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-light tracking-wider mb-4 md:mb-6">CASE STUDY</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="mb-4 md:mb-0 col-span-1">
            <div className="flex items-center mb-2 md:mb-3">
              <div className="text-4xl md:text-5xl text-gray-600 font-light mr-2 md:mr-3">01</div>
              <p className="text-sm text-gray-400">Discovery</p>
            </div>
            
            <div className="bg-gray-800 p-3 md:p-4 mb-2 md:mb-3 rounded">
              <p className="text-sm text-center">Accounting firm spending 15+ hours/week on manual data entry</p>
            </div>
          </div>
          
          <div className="mb-4 md:mb-0 col-span-1">
            <div className="flex items-center mb-2 md:mb-3">
              <div className="text-4xl md:text-5xl text-gray-600 font-light mr-2 md:mr-3">02</div>
              <p className="text-sm text-gray-400">Solution</p>
            </div>
            
            <div className="bg-gray-800 p-3 md:p-4 mb-2 md:mb-3 rounded">
              <p className="text-sm text-center">Custom document processing AI with 94% extraction accuracy</p>
            </div>
          </div>
          
          <div className="mb-4 md:mb-0 col-span-1">
            <div className="flex items-center mb-2 md:mb-3">
              <div className="text-4xl md:text-5xl text-gray-600 font-light mr-2 md:mr-3">03</div>
              <p className="text-sm text-gray-400">Result</p>
            </div>
            
            <div className="bg-gray-800 p-3 md:p-4 mb-2 md:mb-3 rounded">
              <p className="text-sm text-center">12 hours/week saved, allowing team to focus on advisory services</p>
            </div>
            
            <p className="text-xs text-gray-400">ROI: 5.2x on first-year investment</p>
          </div>
        </div>
      </div>

      {/* BOTTOM PROJECTION */}
      <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="text-gray-400 text-sm mb-2 md:mb-0">Average client saves 8-10 hours/week with 3.8x first-year ROI</div>
        <div className="text-gray-500 text-left md:text-right text-xs tracking-widest">MAKEITAIFOR.ME</div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen">
      {/* Slides */}
      <div className="transition-opacity duration-500 ease-in-out">
        {currentSlide === 0 ? <StrategySlide /> : <ProcessSlide />}
      </div>
      
      {/* Navigation Arrows */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-8">
        <button 
          onClick={prevSlide}
          className="bg-gray-800 rounded-full p-2 text-white opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Slide Indicators */}
        <div className="flex items-center space-x-2">
          <div 
            className={`h-2 w-2 rounded-full transition-all ${currentSlide === 0 ? 'bg-white' : 'bg-gray-600'}`}
            aria-label="Slide 1"
          />
          <div 
            className={`h-2 w-2 rounded-full transition-all ${currentSlide === 1 ? 'bg-white' : 'bg-gray-600'}`}
            aria-label="Slide 2"
          />
        </div>
        
        <button 
          onClick={nextSlide}
          className="bg-gray-800 rounded-full p-2 text-white opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default AIConsultingCarousel;