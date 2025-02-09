"use client";
// Home.jsx
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  useEffect(() => {
    // fetchUser(setUser);
  }, []);

  return (
    // Full-page dark background:
    <main className="min-h-screen w-full bg-black text-gray-300">
      <LandingPage />
    </main>
  );
};

export default Home;

function LandingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-5">
      {/* Dark Section (Hero) */}
      <div className="bg-[#171717] rounded-[32px]">
        {/* Header */}
        <header className="sm:p-10 sm:px-12 px-7 py-10">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className='flex flex-row items-center gap-2'>
              <Image
                alt="logo"
                width={34}
                height={34}
                src="/tangram_logo.png"
                className=""
              />
              <span className='text-xl'>Tangram.ai</span>
            </div>

            {/* Navigation Items */}
            <ul className="ml-16 bg-[#232323] border border-[#353434] sm:rounded-full sm:h-14 sm:w-[420px] justify-center items-center flex gap-3 font-semibold rounded-lg py-1 px-2 text-base text-gray-300 hidden md:flex">
              <li>
                <Link className="py-3 sm:px-5 hover:bg-gray-700 hover:rounded-full" href="/#">
                  Home
                </Link>
              </li>
              <li>
                <Link className="py-3 sm:px-5 hover:bg-gray-700 hover:rounded-full" href="/#about">
                  About
                </Link>
              </li>
              <li>
                <Link className="py-3 sm:px-5 hover:bg-gray-700 hover:rounded-full" href="/#feature">
                  Features
                </Link>
              </li>
              <li>
                <Link className="py-3 sm:px-5 hover:bg-gray-700 hover:rounded-full" href="/#pricing">
                  Pricing
                </Link>
              </li>
            </ul>

            {/* Get Started Button */}
            <a
              href="mailto:test@gmail.com"
              className="hidden md:flex group inline-flex items-center justify-center py-3 px-6 text-sm font-semibold border-2 border-orange-500 rounded-full hover:bg-orange-500 hover:text-black"
            >
              <button>Get Started</button>
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="text-center mt-10 sm:mt-7">
          <div className="flex flex-col gap-8">
            <div className="bg-[#232323] border border-[#353434] py-1 px-3 rounded-full w-fit mx-auto flex justify-center items-center gap-2">
              <div className="flex justify-center -space-x-4">
                <Image
                  alt="Profile 1"
                  loading="lazy"
                  width={35}
                  height={35}
                  className="w-[35px] h-[35px] object-cover rounded-full border-2 border-black"
                  src="https://saasta.buildwithiqra.com/lucas.jpg"
                />
                <Image
                  alt="Profile 2"
                  loading="lazy"
                  width={35}
                  height={35}
                  className="w-[35px] h-[35px] object-cover rounded-full border-2 border-black"
                  src="https://saasta.buildwithiqra.com/juno.jpg"
                />
                <Image
                  alt="Profile 3"
                  loading="lazy"
                  width={35}
                  height={35}
                  className="w-[35px] h-[35px] object-cover rounded-full border-2 border-black"
                  src="https://saasta.buildwithiqra.com/s.jpg"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium">Join 4000+ Members</p>
              </div>
            </div>
          </div>

          <h1 className="mt-5 mx-auto max-w-4xl font-display text-3xl font-medium tracking-tight text-white sm:text-6xl">
            Build and Scale Your SaaS Without Limits
          </h1>
          <div className="mx-auto space-y-4 mt-5 text-xl max-w-2xl text-gray-300">
            <p>
              Create professional, high-performing SaaS platforms in record time without writing a
              single line of code.
            </p>
          </div>

          <Link href="/#contact">
            <button className="mt-5 bg-orange-500 hover:text-white text-black font-medium text-base h-11 py-3 px-2 pr-5 rounded-full inline-flex items-center justify-center gap-2">
              <span className="bg-black p-2 rounded-full">
                <Image
                  alt="arrow"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/arrow.svg"
                />
              </span>
              Start today for FREE
            </button>
          </Link>

          <p className="text-gray-400 text-sm mt-2 pb-20">No credit card required.</p>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white p-5 sm:p-14 text-black mt-10 min-h-[500px] rounded-[32px]">
        <div className="grid grid-cols-1 gap-10 sm:gap-32">
          {/* Row 1 */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            {/* Image */}
            <div className="w-full">
              <Image
                alt="About"
                loading="lazy"
                width={1000}
                height={600}
                className="w-full min-h-[250px] sm:min-h-[390px] max-h-screen object-cover rounded-2xl"
                src="https://saasta.buildwithiqra.com/about.jpg"
              />
            </div>
            {/* Text + Feature List */}
            <div className="w-full flex flex-col justify-between">
              <div>
                <h2 className="mb-5 font-display text-3xl tracking-tight sm:leading-[50px] text-left max-w-[60%] sm:max-w-[50%] sm:text-[42px]">
                  Simplify Your SaaS Creation
                </h2>
                <p className="text-gray-600">
                  Launchly equips you with the tools to create, operate, and grow your SaaS platform
                  effortlessly. Whether you’re a solopreneur or a growing startup, we’ve got you
                  covered.
                </p>
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2 border border-gray-200 p-5 rounded-lg">
                  <span className="bg-orange-500 w-fit p-1.5 rounded-full">
                    <Image
                      alt="Vinkje"
                      loading="lazy"
                      width={15}
                      height={15}
                      className="filter invert"
                      src="https://saasta.buildwithiqra.com/vinkje.svg"
                    />
                  </span>
                  <h3 className="text-xl">No Code</h3>
                  <p className="text-sm text-gray-700">
                    Create websites effortlessly, all without the need for any coding.
                  </p>
                </div>

                <div className="flex flex-col gap-2 border border-gray-200 p-5 rounded-lg">
                  <span className="bg-orange-500 w-fit p-1.5 rounded-full">
                    <Image
                      alt="Vinkje"
                      loading="lazy"
                      width={15}
                      height={15}
                      className="filter invert"
                      src="https://saasta.buildwithiqra.com/vinkje.svg"
                    />
                  </span>
                  <h3 className="text-xl">Robust Performance</h3>
                  <p className="text-sm text-gray-700">
                    Enjoy lightning-fast speed and reliable uptime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            {/* Text + Feature List */}
            <div className="w-full flex flex-col justify-between">
              <h2 className="mb-5 font-display text-3xl tracking-tight sm:leading-[50px] text-left max-w-[70%] sm:max-w-[70%] sm:text-[42px]">
                Redefining SaaS Development
              </h2>
              <p className="text-gray-600">
                Platformly empowers non-technical founders and developers alike to create dynamic
                SaaS platforms. Take control with powerful, easy-to-use tools.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2 border border-gray-200 p-5 rounded-lg">
                  <span className="bg-orange-500 w-fit p-1.5 rounded-full">
                    <Image
                      alt="Vinkje"
                      loading="lazy"
                      width={15}
                      height={15}
                      src="https://saasta.buildwithiqra.com/vinkje.svg"
                    />
                  </span>
                  <h3 className="text-xl">Drag &amp; Drop Interface</h3>
                  <p className="text-sm text-gray-700">
                    Create stunning SaaS solutions without writing code.
                  </p>
                </div>

                <div className="flex flex-col gap-2 border border-gray-200 p-5 rounded-lg">
                  <span className="bg-orange-500 w-fit p-1.5 rounded-full">
                    <Image
                      alt="Vinkje"
                      loading="lazy"
                      width={15}
                      height={15}
                      src="https://saasta.buildwithiqra.com/vinkje.svg"
                    />
                  </span>
                  <h3 className="text-xl">Integrated Payments</h3>
                  <p className="text-sm text-gray-700">
                    Accept payments seamlessly via Stripe, PayPal, and more.
                  </p>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="w-full">
              <Image
                alt="About"
                loading="lazy"
                width={1000}
                height={600}
                className="w-full min-h-[250px] sm:min-h-[390px] max-h-screen object-cover rounded-2xl"
                src="https://saasta.buildwithiqra.com/about2.jpg"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            {/* Image (goes first on mobile) */}
            <div className="w-full order-2 sm:order-1">
              <Image
                alt="About"
                loading="lazy"
                width={1000}
                height={600}
                className="w-full min-h-[250px] sm:min-h-[390px] max-h-screen object-cover rounded-2xl"
                src="https://saasta.buildwithiqra.com/about3.jpg"
              />
            </div>
            {/* Text + Feature List (goes second on mobile) */}
            <div className="w-full flex flex-col justify-between order-1 sm:order-2">
              <h2 className="mb-5 font-display text-3xl tracking-tight sm:leading-[50px] text-left max-w-[60%] sm:max-w-[50%] sm:text-[42px]">
                Elevate Your SaaS Journey
              </h2>
              <p className="text-gray-600">
                From idea to execution, ElevateX simplifies every stage of building your SaaS. Launch
                with confidence, knowing you have all the tools you need.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2 border border-gray-200 p-5 rounded-lg">
                  <span className="bg-orange-500 w-fit p-1.5 rounded-full">
                    <Image
                      alt="Vinkje"
                      loading="lazy"
                      width={15}
                      height={15}
                      src="https://saasta.buildwithiqra.com/vinkje.svg"
                    />
                  </span>
                  <h3 className="text-xl">Cloud-Optimized</h3>
                  <p className="text-sm text-gray-700">
                    Your SaaS is powered by enterprise-grade infrastructure.
                  </p>
                </div>
                <div className="flex flex-col gap-2 border border-gray-200 p-5 rounded-lg">
                  <span className="bg-orange-500 w-fit p-1.5 rounded-full">
                    <Image
                      alt="Vinkje"
                      loading="lazy"
                      width={15}
                      height={15}
                      src="https://saasta.buildwithiqra.com/vinkje.svg"
                    />
                  </span>
                  <h3 className="text-xl">Analytics available</h3>
                  <p className="text-sm text-gray-700">
                    Gain valuable insights to grow smarter and faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="feature"
        className="bg-white pt-10 px-5 sm:p-14 text-black mt-10 min-h-[500px] rounded-[32px]"
      >
        <span className="flex mx-auto gap-2 bg-orange-500 text-black w-fit p-1 px-3 rounded-full">
          <Image
            loading="lazy"
            width={20}
            height={20}
            src="https://saasta.buildwithiqra.com/feature.svg"
            alt="Feature Icon"
          />
          Key features
        </span>
        <h2 className="mb-5 text-center font-display text-3xl tracking-tight sm:leading-[50px] mx-auto mt-5 max-w-[70%] sm:max-w-[70%] sm:text-[42px]">
          Explore our key features
        </h2>
        <p className="text-center text-gray-600 w-full sm:max-w-[60%] mx-auto">
          Discover the core functionalities that make SAP the ultimate solution for efficient
          project management.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* Feature Cards */}
          <div className="flex flex-col rounded-lg gap-2 p-7 bg-gray-100 border border-gray-300">
            <span className="bg-orange-500 p-2 rounded-lg w-fit">
              <Image
                loading="lazy"
                width={30}
                height={30}
                src="https://saasta.buildwithiqra.com/task.svg"
                alt="Task Icon"
              />
            </span>
            <h3 className="mt-3 text-base font-medium">Efficient Task Tracking</h3>
            <p className="text-gray-700">Streamline task monitoring for productivity.</p>
          </div>

          <div className="flex flex-col rounded-lg gap-2 p-7 bg-gray-100 border border-gray-300">
            <span className="bg-orange-500 p-2 rounded-lg w-fit">
              <Image
                loading="lazy"
                width={30}
                height={30}
                src="https://saasta.buildwithiqra.com/message.svg"
                alt="Message Icon"
              />
            </span>
            <h3 className="mt-3 text-base font-medium">Smooth Communication</h3>
            <p className="text-gray-700">Enhance team collaboration with messaging.</p>
          </div>

          <div className="flex flex-col rounded-lg gap-2 p-7 bg-gray-100 border border-gray-300">
            <span className="bg-orange-500 p-2 rounded-lg w-fit">
              <Image
                loading="lazy"
                width={30}
                height={30}
                src="https://saasta.buildwithiqra.com/reminder.svg"
                alt="Reminder Icon"
              />
            </span>
            <h3 className="mt-3 text-base font-medium">Automated Reminders</h3>
            <p className="text-gray-700">Never miss a deadline with automated reminders.</p>
          </div>

          <div className="flex flex-col rounded-lg gap-2 p-7 bg-gray-100 border border-gray-300">
            <span className="bg-orange-500 p-2 rounded-lg w-fit">
              <Image
                loading="lazy"
                width={30}
                height={30}
                src="https://saasta.buildwithiqra.com/data.svg"
                alt="Data Icon"
              />
            </span>
            <h3 className="mt-3 text-base font-medium">Simple Data Syncing</h3>
            <p className="text-gray-700">Sync data effortlessly across platforms.</p>
          </div>

          <div className="flex flex-col rounded-lg gap-2 p-7 bg-gray-100 border border-gray-300">
            <span className="bg-orange-500 p-2 rounded-lg w-fit">
              <Image
                loading="lazy"
                width={30}
                height={30}
                src="https://saasta.buildwithiqra.com/management.svg"
                alt="Management Icon"
              />
            </span>
            <h3 className="mt-3 text-base font-medium">Member Management</h3>
            <p className="text-gray-700">Effortlessly manage team members roles.</p>
          </div>

          <div className="flex flex-col rounded-lg gap-2 p-7 bg-gray-100 border border-gray-300">
            <span className="bg-orange-500 p-2 rounded-lg w-fit">
              <Image
                loading="lazy"
                width={30}
                height={30}
                src="https://saasta.buildwithiqra.com/deadline.svg"
                alt="Deadline Icon"
              />
            </span>
            <h3 className="mt-3 text-base font-medium">Deadline Tracking</h3>
            <p className="text-gray-700">Stay on schedule with clear deadlines.</p>
          </div>

          <div className="flex flex-col rounded-lg gap-2 p-7 bg-gray-100 border border-gray-300">
            <span className="bg-orange-500 p-2 rounded-lg w-fit">
              <Image
                loading="lazy"
                width={30}
                height={30}
                src="https://saasta.buildwithiqra.com/intergration.svg"
                alt="Integration Icon"
              />
            </span>
            <h3 className="mt-3 text-base font-medium">Seamless Integrations</h3>
            <p className="text-gray-700">Integrate with existing tools seamlessly.</p>
          </div>

          <div className="flex flex-col rounded-lg gap-2 p-7 bg-gray-100 border border-gray-300">
            <span className="bg-orange-500 p-2 rounded-lg w-fit">
              <Image
                loading="lazy"
                width={30}
                height={30}
                src="https://saasta.buildwithiqra.com/document.svg"
                alt="Document Icon"
              />
            </span>
            <h3 className="mt-3 text-base font-medium">Document Sharing</h3>
            <p className="text-gray-700">Easily share the relevant task documents.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-black rounded-[32px] mt-10 text-center px-4 pt-10 sm:p-14">
        <div>
          <span className="flex mx-auto gap-2 bg-orange-500 text-black mb-5 w-fit p-1 px-3 rounded-full">
            <Image
              loading="lazy"
              width={20}
              height={20}
              src="https://saasta.buildwithiqra.com/review.svg"
              alt="Review Icon"
            />
            Happy customers
          </span>
          <h2 className="mb-5 text-center font-display text-3xl tracking-tight sm:leading-[50px] mx-auto mt-5 max-w-[70%] sm:max-w-[70%] text-white sm:text-[42px]">
            What our client say about <span className="text-orange-500">us</span>
          </h2>

          <div className="flex w-full m-0 p-0 sm:w-auto sm:px-10">
            <div className="px-2 w-full">
              {/* Single Testimonial */}
              <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm p-6 w-full max-w-96 mb-4">
                <blockquote>
                  <p className="text-base text-left text-gray-400 leading-7 mt-1">
                    saasta transformed our online presence from the ground up. The design is
                    stunning, and the user experience has been phenomenal. Their team was with us
                    every step of the way!
                  </p>
                </blockquote>
                <div className="flex gap-2 mt-10">
                  <Image
                    alt="profile"
                    loading="lazy"
                    width={45}
                    height={45}
                    className="object-cover rounded-full border-2 border-gray-700"
                    src="https://saasta.buildwithiqra.com/juno.jpg"
                  />
                  <div>
                    <p className="text-base font-medium text-left text-white">Juno Cooper</p>
                    <p className="text-sm text-left text-gray-400">Small Business Owner</p>
                  </div>
                </div>
              </div>

              {/* Single Testimonial */}
              <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm p-6 w-full max-w-96 mb-4">
                <blockquote>
                  <p className="text-base text-left text-gray-400 leading-7 mt-1">
                    Choosing saasta was the best decision for our business. They created a custom
                    solution that was both beautiful and functional. The support team is responsive
                    and truly cares about our success.
                  </p>
                </blockquote>
                <div className="flex gap-2 mt-10">
                  <Image
                    alt="profile"
                    loading="lazy"
                    width={45}
                    height={45}
                    className="object-cover rounded-full border-2 border-gray-700"
                    src="https://saasta.buildwithiqra.com/maria.jpg"
                  />
                  <div>
                    <p className="text-base font-medium text-left text-white">Nina Simone</p>
                    <p className="text-sm text-left text-gray-400">Marketing Director</p>
                  </div>
                </div>
              </div>

              {/* Single Testimonial */}
              <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm p-6 w-full max-w-96 mb-4">
                <blockquote>
                  <p className="text-base text-left text-gray-400 leading-7 mt-1">
                    From initial contact to the final product, saasta delivered on everything they
                    promised. We’ve seen a boost in engagement, and our clients are loving the new
                    website. Highly recommend!
                  </p>
                </blockquote>
                <div className="flex gap-2 mt-10">
                  <Image
                    alt="profile"
                    loading="lazy"
                    width={45}
                    height={45}
                    className="object-cover rounded-full border-2 border-gray-700"
                    src="https://saasta.buildwithiqra.com/jordan.jpg"
                  />
                  <div>
                    <p className="text-base font-medium text-left text-white">Jordan Peterson</p>
                    <p className="text-sm text-left text-gray-400">Founder</p>
                  </div>
                </div>
              </div>

              {/* Single Testimonial */}
              <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm p-6 w-full max-w-96 mb-4">
                <blockquote>
                  <p className="text-base text-left text-gray-400 leading-7 mt-1">
                    Our project was completed ahead of schedule, and the results have exceeded
                    expectations. saasta’s team took the time to understand our brand and brought
                    our vision to life flawlessly.
                  </p>
                </blockquote>
                <div className="flex gap-2 mt-10">
                  <Image
                    alt="profile"
                    loading="lazy"
                    width={45}
                    height={45}
                    className="object-cover rounded-full border-2 border-gray-700"
                    src="https://saasta.buildwithiqra.com/david.jpg"
                  />
                  <div>
                    <p className="text-base font-medium text-left text-white">david Goggins</p>
                    <p className="text-sm text-left text-gray-400">Sales Manager</p>
                  </div>
                </div>
              </div>

              {/* Single Testimonial */}
              <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm p-6 w-full max-w-96 mb-4">
                <blockquote>
                  <p className="text-base text-left text-gray-400 leading-7 mt-1">
                    saasta’s support team is always there when we need them. They helped us build a
                    site that not only looks great but performs even better. The process was smooth,
                    and the outcome was impressive.
                  </p>
                </blockquote>
                <div className="flex gap-2 mt-10">
                  <Image
                    alt="profile"
                    loading="lazy"
                    width={45}
                    height={45}
                    className="object-cover rounded-full border-2 border-gray-700"
                    src="https://saasta.buildwithiqra.com/lucas.jpg"
                  />
                  <div>
                    <p className="text-base font-medium text-left text-white">Lucas Miller</p>
                    <p className="text-sm text-left text-gray-400">Photographer</p>
                  </div>
                </div>
              </div>

              {/* Single Testimonial */}
              <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm p-6 w-full max-w-96 mb-4">
                <blockquote>
                  <p className="text-base text-left text-gray-400 leading-7 mt-1">
                    We couldn’t be happier with our new website. saasta’s team was professional,
                    responsive, and delivered a product that exceeded our expectations. We’re
                    excited to continue working with them.
                  </p>
                </blockquote>
                <div className="flex gap-2 mt-10">
                  <Image
                    alt="profile"
                    loading="lazy"
                    width={45}
                    height={45}
                    className="object-cover rounded-full border-2 border-gray-700"
                    src="https://saasta.buildwithiqra.com/s.jpg"
                  />
                  <div>
                    <p className="text-base font-medium text-left text-white">Samantha Rose</p>
                    <p className="text-sm text-left text-gray-400">Creative Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div
        id="pricing"
        className="bg-white p-5 sm:p-14 text-black mt-10 min-h-[500px] rounded-[32px]"
      >
        <span className="flex mx-auto gap-2 bg-orange-500 text-black w-fit p-1 px-3 rounded-full">
          <Image
            loading="lazy"
            width={20}
            height={20}
            src="https://saasta.buildwithiqra.com/pricing.svg"
            alt="Pricing Icon"
          />
          Our Pricing
        </span>
        <h2 className="mb-5 text-center font-display text-3xl tracking-tight sm:leading-[50px] mx-auto mt-5 max-w-[70%] sm:max-w-[70%] sm:text-[42px]">
          Our Pricing plans
        </h2>
        <p className="text-center text-gray-600 w-full sm:max-w-[60%] mx-auto">
          Discover SAP, your ultimate solution for seamless project management. With cutting-edge
          tools and intuitive features
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-7">
          {/* Starter Plan */}
          <div className="flex text-left flex-col gap-5 bg-gray-100 border border-gray-300 rounded-xl p-7">
            <div>
              <span className="text-xl font-medium">Starter plan</span>
              <p className="mt-2 text-gray-600">Basic Ideal package for growing businesses</p>
            </div>
            <h3 className="text-4xl font-bold text-black">
              $2,000/<span className="font-normal text-gray-600 text-base"> month</span>
            </h3>
            <ul className="flex flex-col gap-5">
              <li className="flex gap-4">
                <Image
                  alt="vinkje"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/vinkje.svg"
                />
                Responsive Website Design
              </li>
              <li className="flex gap-4">
                <Image
                  alt="vinkje"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/vinkje.svg"
                />
                Basic SEO Optimization
              </li>
              <li className="flex gap-4 line-through text-gray-400">
                <Image
                  alt="vinkjeGrey"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/vinkjeGrey.svg"
                />
                24/7 Dedicated Support
              </li>
              <li className="flex gap-4 line-through text-gray-400">
                <Image
                  alt="vinkjeGrey"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/vinkjeGrey.svg"
                />
                Regular Maintenance and Updates
              </li>
            </ul>
            <Link href="/#">
              <button className="mt-5 bg-black hover:text-orange-500 text-white font-medium text-base h-11 w-full py-3 px-2 pr-5 rounded-full inline-flex items-center justify-center gap-2">
                Get started
              </button>
            </Link>
          </div>

          {/* Lite Plan */}
          <div className="flex text-left flex-col text-white gap-5 bg-black rounded-xl p-7">
            <div className="relative">
              <div className="absolute right-0 -top-1 bg-orange-500 font-semibold text-black text-sm w-fit py-1 px-4 rounded-full">
                Popular
              </div>
              <span className="text-xl font-medium">Lite plan</span>
              <p className="mt-2 text-gray-400">Advanced package for expanded businesses</p>
            </div>
            <h3 className="text-4xl font-bold text-white">
              $5,000/<span className="font-normal text-base"> month</span>
            </h3>
            <ul className="flex flex-col gap-5">
              <li className="flex gap-4">
                <Image
                  alt="vinkje"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/whitevinkje.svg"
                />
                Custom Responsive Website Design
              </li>
              <li className="flex gap-4">
                <Image
                  alt="vinkje"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/whitevinkje.svg"
                />
                Enhanced SEO and Analytics
              </li>
              <li className="flex gap-4">
                <Image
                  alt="vinkje"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/whitevinkje.svg"
                />
                24/7 Dedicated Support Team
              </li>
              <li className="flex gap-4 line-through text-gray-500">
                <Image
                  alt="vinkjeGrey"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/vinkjeGrey.svg"
                />
                Regular Maintenance and Updates
              </li>
            </ul>
            <Link href="/#">
              <button className="mt-5 bg-orange-500 hover:text-white text-black font-medium text-base h-11 w-full py-3 px-2 pr-5 rounded-full inline-flex items-center justify-center gap-2">
                Get started
              </button>
            </Link>
          </div>

          {/* Professional Plan */}
          <div className="flex text-left flex-col gap-5 bg-gray-100 border border-gray-300 rounded-xl p-7">
            <div>
              <span className="text-xl font-medium">Professional Plan</span>
              <p className="mt-2 text-gray-600">Basic Ideal package for growing businesses</p>
            </div>
            <h3 className="text-4xl font-bold text-black">
              $2,000/
              <span className="font-normal text-gray-600 text-base"> month</span>
            </h3>
            <ul className="flex flex-col gap-5">
              <li className="flex gap-4">
                <Image
                  alt="vinkje"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/vinkje.svg"
                />
                Responsive Website Design
              </li>
              <li className="flex gap-4">
                <Image
                  alt="vinkje"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/vinkje.svg"
                />
                Basic SEO Optimization
              </li>
              <li className="flex gap-4 line-through text-gray-400">
                <Image
                  alt="vinkjeGrey"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/vinkjeGrey.svg"
                />
                24/7 Dedicated Support
              </li>
              <li className="flex gap-4 line-through text-gray-400">
                <Image
                  alt="vinkjeGrey"
                  loading="lazy"
                  width={20}
                  height={20}
                  src="https://saasta.buildwithiqra.com/vinkjeGrey.svg"
                />
                Regular Maintenance and Updates
              </li>
            </ul>
            <Link href="/#">
              <button className="mt-5 bg-black hover:text-orange-500 text-white font-medium text-base h-11 w-full py-3 px-2 pr-5 rounded-full inline-flex items-center justify-center gap-2">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#171717] rounded-[32px] pt-16 sm:pt-32 text-center mt-10 sm:mt-7">
        <span className="flex mx-auto gap-2 bg-orange-500 text-black mb-5 w-fit p-1 px-3 rounded-full">
          <Image
            loading="lazy"
            width={20}
            height={20}
            src="https://saasta.buildwithiqra.com/review.svg"
            alt="Review Icon"
          />
          Happy customers
        </span>
        <h2 className="mb-5 text-center font-display text-3xl tracking-tight sm:leading-[50px] mx-auto mt-5 max-w-[80%] sm:max-w-[70%] text-white sm:text-[42px]">
          Ready to launch your SaaS?
        </h2>
        <div className="mx-auto space-y-4 mt-5 text-lg text-gray-300 max-w-lg">
          <p>
            Build Professional Websites Without a Single Line of Code, Blasting Speed, and Elevate
            SEO and Performance.
          </p>
        </div>
        <Link href="/#contact">
          <button className="mt-5 bg-orange-500 hover:text-white text-black font-medium text-base h-11 py-3 px-2 pr-5 rounded-full inline-flex items-center justify-center gap-2">
            <span className="bg-black p-2 rounded-full">
              <Image
                alt="arrow"
                loading="lazy"
                width={20}
                height={20}
                src="https://saasta.buildwithiqra.com/arrow.svg"
              />
            </span>
            Start today for FREE
          </button>
        </Link>
        <p className="text-gray-400 text-sm mt-2 pb-20">No credit card required.</p>
      </div>

      {/* Footer */}
      <footer className="py-10 min-h-[100px] pt-[10px] h-full bg-black text-gray-300">
        <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-24 lg:px-8 lg:pt-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-12">
            {/* Footer Logo & Description */}
            <div className='flex flex-row gap-4 items-center justify-between'>
              <Image
                alt="logo"
                loading="lazy"
                width={40}
                height={30}
                src="/tangram_logo.png"
                className=""
              />
              <p className="mt-4 text-gray-400">
                Let us help you accelerate.
              </p>
            </div>

            {/* Footer Links */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-lg font-medium leading-6">Features</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/authentication"
                      >
                        Authentication
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/database"
                      >
                        Database
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/payments"
                      >
                        Payments
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/emails"
                      >
                        Emails
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/file-storage"
                      >
                        File Storage
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/admin-panel"
                      >
                        Admin Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/settings-page"
                      >
                        Settings Page
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mt-10 md:mt-0">
                  <h3 className="text-lg font-medium leading-6">Support</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/activate-license"
                      >
                        Activate License
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://discord.gg/yqYnveQaeK"
                        rel="noopener noreferrer"
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                      >
                        Discord
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:fayaz@supersaas.dev"
                        rel="noopener noreferrer"
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                      >
                        Email Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://t.me/fayazara"
                        rel="noopener noreferrer"
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                      >
                        Telegram me
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/affiliate-program"
                      >
                        Affiliate Program
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-lg font-medium leading-6">Resources</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/about"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/blog"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/tools"
                      >
                        Tools
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/docs"
                      >
                        Documentation
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-lg font-medium leading-6">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/license"
                      >
                        License
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/privacy-policy"
                      >
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-sm leading-6 text-gray-400 hover:text-orange-500"
                        href="/tos"
                      >
                        Terms
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
