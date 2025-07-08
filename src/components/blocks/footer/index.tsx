'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Risa from '@/app/assets/images/risa.png';
import Ukaid from '@/app/assets/images/ukaid.png';
import { Separator } from '@/components/ui/separator';
import Logo from '@/app/assets/images/iif_logo_white.png'
import DecorativeCurve from '@/components/DecorativeCurve';

const Footer = ({withSponsors= true, withSubscribe = true}: {withSponsors?: boolean, withSubscribe?: boolean}) => {
  return (
    <div>
      
      {withSubscribe && (
          <section className="relative bg-white py-22 px-6 lg:px-8">
        <div className="container  mx-auto space-y-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="space-y-4 w-full sm:w-1/2 ">
            <Badge variant="primary-brown-25" className="uppercase rounded-8 ">GET UPDATED</Badge>
            <h2 className="text-3xl font-bold text-primary-green leading-12 sm:text-4xl">
              <span className="block">Subscribe to Our Newsletter</span>
            </h2>
            <p className="text-sm text-main-text-color">Joining NIIRIC connects you to a dynamic network of stakeholders in Nigeria’s impact investing,research.</p>
          </div>
          <div className="w-full sm:w-1/2 ">
            <form className="flex flex-col sm:flex-row items-center">
              <div className="relative bg-primary-brown/25 border rounded-lg h-14 flex items-center sm:mb-0 sm:flex-1">
  <input
    type="email"
    placeholder="Enter your email"
    className="border-none outline-none rounded-lg p-2 flex-1 h-full"
  />
  <button
    type="submit"
    className="absolute right-2 h-11 top-1/2 -translate-y-1/2 bg-primary-green text-white rounded-lg px-4 py-2 flex items-center justify-center transition hover:bg-primary-green/90"
  >
    Submit Now <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
  </button>
</div>
        
              
            </form>
          </div>
        </div>
          <DecorativeCurve
          className=""
          style={{ position: "absolute", top: "0", left: "150px" }}
        />
      </section>
      
      )}
      {withSponsors && withSubscribe && <Separator className='bg-primary-green'/>}
      {withSponsors && (
        <section className="bg-white py-20 px-6 lg:px-8">
      <div className="container  mx-auto  relative max-w-7xl">
        <div className="space-y-4">
          <h6 className="text-xl lg:text-3xl text-center text-primary-green font-semibold">
          Our Sponsors
          </h6>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
<div className="w-2/12 ">
            <Image src={Risa} alt="Sponsor 1" className="w-full" />
          </div>
          <div className="w-2/12">
            <Image src={Ukaid} alt="Sponsor 2" className="w-full" />
          </div>
        </div>
          
          </div>
        
    </section>
      )}
       <footer className="text-white body-font bg-primary-green">
      <div className="mx-auto relative container px-5 lg:px-0 py-16 md:py-24 flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="lg:w-1/3 md:w-1/2 w-full px-4 mb-4 md:mb-0">
          <Link href="/" className="w-40 h-16 flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
             <Image
                  src={Logo}
                  alt={"IIF_Logo"}
                  width={163}
                  height={63}
                  className="object-cover w-full h-full object-center"
                        />
          </Link>
          <p className="mt-2 text-base">
            The Nigerian Impact Investing Research Industry Collaborative (NIIRIC), established under the auspices of the Impact Investors Foundation (IIF) and the Nigerian Advisory Board on Impact Investing (NABII), is actively addressing the critical need for high-quality research, cohesive industry collaboration, capacity-building, and a robust policy framework in Nigeria.
            {/* The Nigerian ESO Collaborative, a Programme of{' '} */}
            {/* <a href="https://www.impactinvestorsfoundation.org" target="_blank" rel="noopener noreferrer">
              Impact Investors Foundation
            </a>{' '}
            is a platform of Enterprise Support Organizations building a stronger MSME network in Nigeria */}
          </p>
        </div>

        <div className="lg:w-1/3 md:w-1/2 w-full mb-4 md:mb-0 px-4 text-base space-y-3">
          <h2 className="title-font font-semibold tracking-widest">Get Involved</h2>
          <nav className="list-none space-y-3">
            <li>
              <Link href="/general/esos">Enterprise Support Organizations</Link>
            </li>
            <li>
              <a
                href="https://docs.google.com/forms/d/1_lE4s9DZz2yhYYBUsCHc3YHrbtIRYbJ8OnzLt_wqpb0/viewform?edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the community
              </a>
            </li>
            <li>
              <Link href="/general/programmes">Programmes</Link>
            </li>
            <li>
              <Link href="/general/events">Events</Link>
            </li>
          </nav>
        </div>

        <div className="lg:w-1/3 md:w-1/2 w-full px-4 mb-4 md:mb-0 text-base space-y-3">
          <h2 className="title-font font-semibold tracking-widest">Contact Us</h2>
          <nav className="list-none space-y-3">
            <li className="inline-flex items-start gap-2">
              <span className="mt-2">
                {/* Replace with icon component or keep SVG */}
                <img src="/assets/icons/location.svg" alt="Location Icon" className="w-4 h-4" />
              </span>
              <span>
                Standard Chartered Building, 989 Workspace, 10th Floor, 142 Ahmadu Bello Way, Victoria Island Lagos.
              </span>
            </li>
            <li className="inline-flex items-center gap-2">
              <span>
                <img src="/assets/icons/email.svg" alt="Email Icon" className="w-4 h-4" />
              </span>
              <p>info@impactinvestorsfoundation.org</p>
            </li>
            <li className="inline-flex items-center gap-2">
              <span>
                <img src="/assets/icons/phone.svg" alt="Phone Icon" className="w-4 h-4" />
              </span>
              <p>+234-000-000-0000</p> {/* Replace with actual phone number if available */}
            </li>
          </nav>
        </div>
      </div>
    </footer>
    </div>
   
  );
};

export default Footer;
