"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  Puzzle, 
  Brain, 
  CreditCard, 
  LayoutGrid,
  Database, 
  Workflow,
  Boxes,
  Grid3X3,
  Bot,
  CheckCircle2,
  Settings,
  Lock,
  CornerRightDown
} from "lucide-react";
import TangramAnimation from "@/components/TangramAnimation";
import { useStytchUser } from "@stytch/nextjs";

const UserInfo = () => {
  const {user, isInitialized, fromCache} = useStytchUser();

  if (!isInitialized) {
    return <p>Loading...</p>;
  }
  return (<div>Welcome, {user?.name.first_name}</div>);
}

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeBlock, setActiveBlock] = useState('input');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // In a real implementation, you would send this to your backend
      console.log('Subscribed email:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const { user, isInitialized } = useStytchUser();

  console.log("Landing Page Rendered, user: ", user);
  console.log("Landing Page Rendered, isInitialized: ", isInitialized);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-medium">tangram.ai</Link>
            <Image
              src="/tangram_logo.png"
              alt="Tangram Logo"
              width={30}
              height={30}
              className="transition-transform duration-300 hover:rotate-45"
            />
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-full px-2 py-1">
              <a href="#features" className="text-sm px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-zinc-800">Features</a>
              <a href="#blocks" className="text-sm px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-zinc-800">Blocks</a>
              <a href="#use-cases" className="text-sm px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-zinc-800">Use Cases</a>
              <a href="#pricing" className="text-sm px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-zinc-800">Pricing</a>
            </div>
          </nav>
          
          <div className="flex items-center">
            <a 
              href="#notify" 
              className="border-2 border-orange-500 hover:bg-orange-500 hover:text-black text-white text-sm font-medium rounded-full px-5 py-2 transition-all duration-300"
            >
              Get Notified
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-24 container mx-auto px-4 flex flex-col items-center">
        {/* <div className="inline-flex items-center bg-zinc-900/80 border border-zinc-800 rounded-full px-4 py-1.5 mb-8 text-sm">
          <span className="bg-orange-500 h-2 w-2 rounded-full mr-2"></span>
          <span>Coming Soon</span>
          <ChevronRight className="ml-1 w-4 h-4" />
        </div> */}
        
        <div className="w-[700px] h-90 mb-32 md:mb-24 sm:mb-10 mt-32 md:mt-20 sm:mt-10 items-center">
          <TangramAnimation scale={2.8}/>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-center leading-tight mb-6 z-10">
           tangram.ai
           <UserInfo />
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mb-6">
          Legos, but for work. Generate workflows with Modular blocks.
        </p>
        
        <p className="text-md text-gray-400 text-center max-w-xl mb-12">
          Build intelligent workflows block by block. Or generate them on the fly. 
        </p>
        
        <div id="notify" className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubscribe} className="relative">
            <input
              type="email"
              placeholder="Enter your email for updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-full px-6 py-3 pr-36 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bg-orange-500 hover:bg-orange-600 text-black font-medium rounded-full px-4 py-1.5 transition-all duration-200"
            >
              Get Notified
            </button>
          </form>
          {subscribed && (
            <p className="text-center text-green-400 mt-2 text-sm">
              Thanks! We&apos;ll notify you when we launch.
            </p>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
              <LayoutGrid className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">1. Drag</h3>
            <p className="text-gray-400">
              Select the blocks you need from our extensive library.
            </p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
              <Workflow className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">2. Connect</h3>
            <p className="text-gray-400">
              Link blocks together to define your workflow pattern.
            </p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">3. Run</h3>
            <p className="text-gray-400">
              Set it live and watch Tangram handle everything automatically.
            </p>
          </div>
        </div>
      </section>

      {/* AI Powered Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-12 border border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-zinc-800/80 border border-zinc-700 rounded-full px-4 py-1.5 mb-6 text-sm">
                <span className="bg-orange-500 h-2 w-2 rounded-full mr-2"></span>
                <span>AI Does the Heavy Lifting</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6">Define Once, Automate Forever</h2>
              <p className="text-gray-400 mb-8">
                Each block contains intelligent automation that adapts to your data and learns from your processes. 
                Define your workflow once, then let AI take over the repetitive tasks.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                    <Brain className="w-4 h-4 text-orange-400" />
                  </div>
                  <h3 className="font-medium mb-1">AI-Powered Execution</h3>
                  <p className="text-sm text-gray-400">Each block contains intelligent automation that adapts to your data.</p>
                </div>
                
                <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                    <Bot className="w-4 h-4 text-orange-400" />
                  </div>
                  <h3 className="font-medium mb-1">Continuous Learning</h3>
                  <p className="text-sm text-gray-400">Workflows get smarter over time as they process more data.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-xl overflow-hidden bg-zinc-800 p-4">
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div 
                      key={item} 
                      className={`aspect-square rounded-lg flex items-center justify-center ${
                        item % 2 === 0 ? 'bg-zinc-700' : 'bg-zinc-900'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-500/30 flex items-center justify-center">
                        <Brain className="w-3 h-3 text-orange-400" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="bg-zinc-900 rounded-lg py-1.5 px-4 flex items-center gap-2">
                    <span className="animate-pulse w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-300">AI Processing...</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-zinc-800 rounded-xl p-4 border border-zinc-700 shadow-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Automatic Execution</p>
                    <p className="text-xs text-gray-400">No manual intervention needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-medium text-center mb-2">Key Features</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Discover why Tangram.ai is the ultimate solution for building modular AI-powered workflows.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700 hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6">
              <Puzzle className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">Modular Design</h3>
            <p className="text-gray-400">
              Snap together pre-built blocks to create custom workflows, without writing code.
            </p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700 hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">AI-Powered Blocks</h3>
            <p className="text-gray-400">
              Leverage AI Blocks in automations to enable autonous decision making and content generation.
            </p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700 hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Grid3X3 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">No-Code Building</h3>
            <p className="text-gray-400">
              Taking a game design approach to functional software. Zero programming needed to create powerful workflows.
            </p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700 hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">Unlimited Connections</h3>
            <p className="text-gray-400">
              Link to your existing tools and data sources seamlessly for a truly integrated workflow.
            </p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700 hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
              <Settings className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">Custom Configuration</h3>
            <p className="text-gray-400">
              Tailor each block to your exact needs with flexible parameters and settings.
            </p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700 hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">Best In Class AI</h3>
            <p className="text-gray-400">
              Have access to the best model for a given task. Take the compliance and security worries off your plate.
            </p>
          </div>
        </div>
      </section>

      {/* Block Types Section */}
      <section id="blocks" className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-medium text-center mb-2">Intelligent Blocks That Work For You</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Once your workflow is defined, AI takes over. Each block handles its specialized task autonomously,
          adapting to your data and getting smarter over time.
        </p>
        
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              onClick={() => setActiveBlock('input')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeBlock === 'input' ? 'bg-orange-500 text-black' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              Input Blocks
            </button>
            <button 
              onClick={() => setActiveBlock('processing')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeBlock === 'processing' ? 'bg-orange-500 text-black' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              Processing Blocks
            </button>
            <button 
              onClick={() => setActiveBlock('decision')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeBlock === 'decision' ? 'bg-orange-500 text-black' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              Decision Blocks
            </button>
            <button 
              onClick={() => setActiveBlock('output')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeBlock === 'output' ? 'bg-orange-500 text-black' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              Output Blocks
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              {activeBlock === 'input' && (
                <>
                  <h3 className="text-2xl font-medium mb-4">Input Blocks</h3>
                  <p className="text-gray-400 mb-6">
                    Gather data from forms, emails, databases, and more. Input blocks connect your workflows
                    to any source of information you need.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">Form capture and validation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">Email and document parsing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">API and webhook integration</span>
                    </li>
                  </ul>
                </>
              )}
              
              {activeBlock === 'processing' && (
                <>
                  <h3 className="text-2xl font-medium mb-4">Processing Blocks</h3>
                  <p className="text-gray-400 mb-6">
                    Transform, analyze, and extract insights from your data. Processing blocks apply
                    intelligent operations to prepare information for the next step.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">AI-powered data extraction</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">Format transformation and normalization</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">Machine learning analysis</span>
                    </li>
                  </ul>
                </>
              )}
              
              {activeBlock === 'decision' && (
                <>
                  <h3 className="text-2xl font-medium mb-4">Decision Blocks</h3>
                  <p className="text-gray-400 mb-6">
                    Make intelligent routing decisions based on complex criteria. Decision blocks
                    determine the path your workflow should take next.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">Conditional branching logic</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">AI-based decision making</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">Pattern recognition and prediction</span>
                    </li>
                  </ul>
                </>
              )}
              
              {activeBlock === 'output' && (
                <>
                  <h3 className="text-2xl font-medium mb-4">Output Blocks</h3>
                  <p className="text-gray-400 mb-6">
                    Generate reports, send notifications, update systems, and more. Output blocks
                    deliver the results of your workflow where they need to go.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">Formatted report generation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">Multi-channel notifications</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">System integrations and updates</span>
                    </li>
                  </ul>
                </>
              )}
            </div>
            
            <div className="relative">
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-1 shadow-xl">
                <div className="bg-zinc-900 rounded-lg overflow-hidden p-6">
                  <div className="flex flex-col items-center">
                    {activeBlock === 'input' && (
                      <div className="w-full">
                        <div className="flex items-center justify-center bg-zinc-800 rounded-lg p-4 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-4">
                            <Database className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 bg-zinc-700 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <CornerRightDown className="text-zinc-600 w-6 h-6 animate-bounce" />
                        </div>
                      </div>
                    )}
                    
                    {activeBlock === 'processing' && (
                      <div className="w-full">
                        <div className="flex items-center justify-center bg-zinc-800 rounded-lg p-4 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-4">
                            <Brain className="w-5 h-5 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 bg-zinc-700 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <CornerRightDown className="text-zinc-600 w-6 h-6 animate-bounce" />
                        </div>
                      </div>
                    )}
                    
                    {activeBlock === 'decision' && (
                      <div className="w-full">
                        <div className="flex items-center justify-center bg-zinc-800 rounded-lg p-4 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mr-4">
                            <Settings className="w-5 h-5 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 bg-zinc-700 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <CornerRightDown className="text-zinc-600 w-6 h-6 animate-bounce" />
                        </div>
                      </div>
                    )}
                    
                    {activeBlock === 'output' && (
                      <div className="w-full">
                        <div className="flex items-center justify-center bg-zinc-800 rounded-lg p-4 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center mr-4">
                            <Zap className="w-5 h-5 text-red-400" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 bg-zinc-700 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <CheckCircle2 className="text-green-500 w-6 h-6" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-medium text-center mb-2">Common Use Cases</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          See how Tangram&apos;s modular workflow approach can transform various processes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">Data Processing</h3>
            <p className="text-gray-400 mb-4">
              Extract, transform, and analyze data from multiple sources, automatically organizing information 
              for further use.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-orange-400" />
                </div>
                <span className="text-gray-400 text-sm">Document information extraction</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-orange-400" />
                </div>
                <span className="text-gray-400 text-sm">Data cleaning and formatting</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-orange-400" />
                </div>
                <span className="text-gray-400 text-sm">Automated report generation</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Bot className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">Content Generation</h3>
            <p className="text-gray-400 mb-4">
              Create, optimize, and distribute content across platforms, maintaining consistent branding and messaging.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm">Social media content scheduling</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm">Blog post creation and optimization</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm">Multi-channel content distribution</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6">
              <Boxes className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">Customer Engagement</h3>
            <p className="text-gray-400 mb-4">
              Build personalized communication flows that respond to user actions, increasing engagement and conversion.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                </div>
                <span className="text-gray-400 text-sm">Automated email nurture sequences</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                </div>
                <span className="text-gray-400 text-sm">Personalized product recommendations</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                </div>
                <span className="text-gray-400 text-sm">Customer feedback collection and analysis</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:border-zinc-700">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Workflow className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-medium mb-3">Business Operations</h3>
            <p className="text-gray-400 mb-4">
              Automate repetitive tasks and approval processes, freeing up time for strategic work.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm">Document approval workflows</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm">Employee onboarding automation</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center mr-3 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm">Expense report processing</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-medium text-center mb-2">Only Pay For What You Use</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          No more wasted subscription fees. With Tangram&apos;s usage-based pricing, you only pay 
          for the blocks and executions you actually use.
        </p>
        
        <div className="relative mb-16 max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Fair Usage Pricing</h3>
                <p className="text-gray-400">Your costs scale directly with your actual usage</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">What&apos;s Included:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-gray-300">Pay per workflow execution</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-gray-300">No minimum commitment</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-gray-300">Scale up or down instantly</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-gray-300">No charge for inactive workflows</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-gray-300">Volume discounts automatically applied</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <div className="h-48 bg-gradient-to-b from-zinc-800/50 to-zinc-900 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-500">$0.01</div>
                    <div className="text-gray-400 mt-1">per block execution</div>
                    <div className="mt-4 text-gray-500 text-sm">Coming Soon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-8 right-8 bg-zinc-800 rounded-xl p-4 border border-zinc-700 shadow-xl">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Build as many workflows as you need</p>
                <p className="text-xs text-gray-400">You&apos;re only charged when they run</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <a href="#notify" className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium transition-colors">
            Get notified when we launch
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-medium mb-4">Ready to transform your workflow?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Be the first to experience Tangram.ai&apos;s modular AI-powered workflow platform.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative">
            <input
              type="email"
              placeholder="Enter your email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-full px-6 py-3 pr-36 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bg-orange-500 hover:bg-orange-600 text-black font-medium rounded-full px-4 py-1.5 transition-all duration-200"
            >
              Get Notified
            </button>
          </form>
          {subscribed && (
            <p className="text-center text-green-400 mt-2 text-sm">
              Thanks! We&apos;ll notify you when we launch.
            </p>
          )}
          <p className="text-gray-500 text-sm mt-4">We respect your privacy and won&apos;t share your information.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-medium">tangram.ai</span>
                <Image
                  src="/tangram_logo.png"
                  alt="Tangram Logo"
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-gray-400 mb-4">
                Modular AI-powered workflows that work for you.
              </p>
              <p className="text-sm text-gray-500">© 2025 Tangram AI, Inc.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Use Cases</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;