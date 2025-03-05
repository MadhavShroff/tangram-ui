import React from 'react';

const AIConsultingStrategySlide = () => {
  return (
    <div className="bg-black text-white p-12 min-h-screen font-sans">
      {/* STRATEGY SECTION */}
      <div className="mb-10">
        <h2 className="text-2xl font-light tracking-wider mb-6">STRATEGY</h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-5xl text-gray-600 font-light mb-4">01</div>
            <p className="text-sm leading-snug">
              Position MakeItAiFor.Me for small businesses with 10 to 100 employees seeking accessible AI solutions
            </p>
          </div>
          
          <div>
            <div className="text-5xl text-gray-600 font-light mb-4">02</div>
            <p className="text-sm leading-snug">
              Deliver ready-to-implement AI tools with clear ROI and minimal technical overhead
            </p>
          </div>
          
          <div>
            <div className="text-5xl text-gray-600 font-light mb-4">03</div>
            <p className="text-sm leading-snug">
              Generate revenue through initial consultation and ongoing implementation services
            </p>
          </div>
        </div>
      </div>

      {/* COMPETITIVE ADVANTAGES SECTION */}
      <div className="mb-10 bg-black">
        <h2 className="text-2xl font-light tracking-wider mb-6">COMPETITIVE ADVANTAGES</h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-5xl text-gray-600 font-light mb-4">01</div>
            <p className="text-sm leading-snug">
              Simplified AI onboarding that doesn&apos;t require clients to hire technical specialists
            </p>
          </div>
          
          <div>
            <div className="text-5xl text-gray-600 font-light mb-4">02</div>
            <p className="text-sm leading-snug">
              Small enough to move quickly, large enough to provide reliable ongoing support
            </p>
          </div>
          
          <div>
            <div className="text-5xl text-gray-600 font-light mb-4">03</div>
            <p className="text-sm leading-snug">
              Focus on SMB-specific use cases overlooked by both enterprise vendors and self-service tools
            </p>
          </div>
        </div>
      </div>

      {/* HYPOTHESES SECTION */}
      <div className="mb-10 bg-black">
        <h2 className="text-2xl font-light tracking-wider mb-6">HYPOTHESES</h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-5xl text-gray-600 font-light mb-4">01</div>
            <p className="text-sm leading-snug">
              Small businesses want AI benefits but lack time, expertise and budget for custom development
            </p>
          </div>
          
          <div>
            <div className="text-5xl text-gray-600 font-light mb-4">02</div>
            <p className="text-sm leading-snug">
              Will pay $2K-$3K for initial 3-month consultation + $500-$1K/month for implementation
            </p>
          </div>
          
          <div>
            <div className="text-5xl text-gray-600 font-light mb-4">03</div>
            <p className="text-sm leading-snug">
              Industry-specific solutions create referral networks and reduce customer acquisition costs
            </p>
          </div>
        </div>
      </div>

      {/* EXAMPLES SECTION */}
      <div className="mb-10 bg-black">
        <h2 className="text-2xl font-light tracking-wider mb-6">EXAMPLES</h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-3">
              <div className="text-5xl text-gray-600 font-light mr-3">01</div>
              <p className="text-sm text-gray-400">Local Law Firm</p>
            </div>
            
            <div className="bg-gray-800 p-4 mb-3 rounded">
              <p className="text-sm text-center">Need AI to automate document review and client intake</p>
            </div>
            
            <p className="text-xs text-gray-400">$3K consultation + $750/month implementation = $12K first year</p>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <div className="text-5xl text-gray-600 font-light mr-3">02</div>
              <p className="text-sm text-gray-400">Communications Agency</p>
            </div>
            
            <div className="bg-gray-800 p-4 mb-3 rounded">
              <p className="text-sm text-center">Need integrated AI tools for ESG reporting and stakeholder engagement</p>
            </div>
            
            <p className="text-xs text-gray-400">$3K consultation + $1K/month implementation = $15K first year</p>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <div className="text-5xl text-gray-600 font-light mr-3">03</div>
              <p className="text-sm text-gray-400">Real Estate Agency</p>
            </div>
            
            <div className="bg-gray-800 p-4 mb-3 rounded">
              <p className="text-sm text-center">Need AI tools for lead qualification and property matching</p>
            </div>
            
            <p className="text-xs text-gray-400">$2K consultation + $500/month implementation = $8K first year</p>
          </div>
        </div>
      </div>

      {/* BOTTOM PROJECTION */}
      <div className="mt-8 flex justify-between items-center">
        <div className="text-gray-400 text-sm">75 clients × ~$9K ARR → $675K ARR → $3-4M valuation</div>
        <div className="text-gray-500 text-right text-xs tracking-widest">MAKEITAIFOR.ME</div>
      </div>
    </div>
  );
};

export default AIConsultingStrategySlide;