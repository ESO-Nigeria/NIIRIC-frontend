import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative pb-20 pt-15 md:pb-32 md:pt-48 bg-[#F2F5F2] px-6 lg:px-8">
      <div className="container mx-auto relative z-10">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <h1 className="font-bold text-3xl text-primary-green  md:text-5xl leading-tight">
              Driving Impact Investing, Research, and Innovation in Nigeria
              
            </h1>
            <p className="mt-5 sm:mt-8 text-sm sm:text-base text-main-text-color leading-7">
             The Nigeria Impact Investing Research Industry Collaborative (NIIRIC) is Nigeria’s premier network dedicated to advancing the nation’s impact investing, research, and innovation ecosystem.
            </p>

            <div className="mt-10 sm:flex sm:items-center space-x-4 sm:space-x-8">
              <Button variant="primary-green" className="text-base h-12  mt-4 sm:mt-0">Become a member <ArrowRight className="size-5" /> </Button>
              <Button variant="primary-brown" className="text-base mt-4 h-12 sm:mt-0">
                Learn More <ArrowRight className="size-5" />
              </Button>

            </div>
          </div>

          {/* Right Image */}
          <div className="">
            <div className="relative h-full overflow-hidden">
            
              
            </div>
          </div>
        </div>

         {/* <div className="relative z-10"> */}
                <div className="absolute left-1/2 bottom-[-40px] md:bottom-[-50px] -translate-x-1/2 z-20">
      <div className=" overflow-hidden w-[50px] h-[50px] md:w-[91px] md:h-[91px] flex items-center justify-center">
        <img
          src="/assets/images/research.png"
          alt="Secondary"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
    <div className="rounded-full border-8 border-white  overflow-hidden  md:w-[452px] md:h-[452px] flex items-center justify-center">
      <img
        src="/assets/images/hero_image_1.png"
        alt="Main"
        className="object-cover w-full h-full"
      />
    </div>
    {/* Small circle image, overlapping */}
    <div className="absolute left-1/2 bottom-[-40px] md:bottom-[-50px] -translate-x-1/2 z-20">
      <div className=" overflow-hidden w-[170px] h-[170px] md:w-[241px] md:h-[241px] flex items-center justify-center">
        <img
          src="/assets/images/hero_image_2.png"
          alt="Secondary"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
     <div className="absolute left-1/2 bottom-[-40px] md:bottom-[-50px] -translate-x-1/2 z-20">
      <div className=" overflow-hidden w-[170px] h-[170px] md:w-[241px] md:h-[241px] flex items-center justify-center">
        <img
          src="/assets/images/hero_image_2.png"
          alt="Secondary"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
     
  
  
  
  
  {/* </div> */}
      </div>
      <div className="absolute right-0 top-0 h-full">
     
        <img
          src="/assets/images/rectangle.png"
          alt="Secondary"
          className="object-cover w-full h-full"
        />
     
    </div>
    </section>
  );
}
