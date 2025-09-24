"use client";

import GeneralLayout from "@/layouts/General";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaArrowRight, FaEnvelope, FaPhoneAlt } from "react-icons/fa";



function Page() {
  const router = useRouter();

  return (
    <GeneralLayout>
    <section
    className="w-full h-[400px] bg-cover bg-center"
    style={{
        backgroundImage: "linear-gradient(to right, #003302 0%, #009906 30%, transparent 100%), url('/assets/images/DSC_9458.png')",
    }}
    >
        <div className="p-20">
            <p className="text-[16px] font-medium flex items-center bg-white px-6 py-3 rounded-[8px] w-fit shadow-md font-raleway">
              CONTACT US
            </p>
            <h1 className="text-6xl font-semibold text-white pt-10 font-raleway">Get in touch <br /> with NIIRIC</h1>
            <p className="text-white pt-10 text-[20px] font-medium font-raleway">We are here to support you. Reach out to us for inquiries.</p>

        </div>

    </section>
    <section className="my-20 px-15">
        <div className="flex gap-8">
          <div className="w-1/2">
          <h1 className="font-medium text-[28px] text-[#003302] font-poppins">Connect with us today!</h1>
          <p className="py-5 text-[#242424] font-raleway">We are here to support you. Reach out to us for inquiries.</p>
        <div className="space-y-4 ">
          {/* Phone + Email row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Phone Card */}
            <div className="border border-[#00330257] rounded-[12px] p-4 w-full ">
              <div className="flex items-center gap-2 mb-2 font-raleway">
                <span className="bg-[#D1AE6F40] h-8 w-8 rounded-full  flex items-center justify-center">
                  
                  <i className="fi-rr-phone-call pt-2 text-[#003302] text-[16px]"></i>
                </span>
                <p className="font-medium">Phone</p>
              </div>
              <p className="text-sm">+234 (808) 360 2223</p>
            </div>

            {/* Email Card */}
            <div className="border border-[#00330257] rounded-[12px] p-4 w-full ">
              <div className="flex items-center gap-2 mb-2 font-raleway">
                 <span className="bg-[#D1AE6F40] h-8 w-8 rounded-full  flex items-center justify-center">
                  <i className="fi-rr-envelope pt-2 text-[#003302] text-[16px]"></i>
                </span>

                <p className="font-medium">E-mail</p>
              </div>
              <p className="text-sm break-words">
                info@impactinvestorsfoundation.org
              </p>
            </div>
          </div>

          {/* Address Card */}
          <div className="border border-[#00330257] rounded-[12px] p-4 w-full">
            <div className="flex items-center gap-2 mb-2 font-raleway">
                 <span className="bg-[#D1AE6F40] h-8 w-8 rounded-full  flex items-center justify-center">
                  <i className="fi-rr-map-marker pt-2 text-[#003302] text-[16px]"></i>
                </span>
              <p className="font-medium">Address</p>
            </div>
            <p className="text-sm leading-relaxed">
              Standard Chartered Building, 989 Workspace, 10th Floor, 
              142 Ahmadu Bello Way, Victoria Island, Lagos.
            </p>
          </div>
        </div>

          </div>
          <form className="w-2/3 border border-[#00330257] rounded-[8px] p-10 font-dmSans">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-[#F04438]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-[#F04438]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-[#F04438]">*</span>
                  </label>
                  <div className="relative">
                    <i className="fi-rr-envelope absolute left-3 top-4.5 w-5 h-5 text-gray-400"></i>

                    {/* <FaEnvelope className="absolute left-3 top-4.5 w-5 h-5 text-gray-400" /> */}
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-[#F04438]">*</span>
                  </label>
                  <div className="relative">
                    {/* <FaPhoneAlt className="absolute left-3 top-4 w-5 h-5 text-gray-400" /> */}
                    <i className="fi-rr-phone-call absolute left-3 top-4.5 w-5 h-5 text-gray-400"></i>

                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-[#F04438]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-[#F04438]">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter your message here"
                  className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center space-x-2 my-5">
                <input
                  id="not-robot"
                  type="checkbox"
                  className="h-4 w-4 text-[#1B4137] border rounded focus:ring-[#1B4137]"
                />
                <label htmlFor="not-robot" className="text-sm text-gray-700">
                  I am not a robot
                </label>
              </div>


              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#1B4137] hover:bg-[#1B413795] w-[211px] h-[48px] cursor-pointer text-white font-normal py-2 px-4 rounded-[4px] transition"
                >
                  Contact Us <FaArrowRight className="inline-block ms-2" />
                </button>
              </div>
          </form>
       
        </div>

    </section>
    <section className="flex items-center justify-center py-10">
      <div className="w-full max-w-[1227px] h-[588px] bg-[#F2F5F2] rounded-[32px] flex items-center justify-center">
    <div className="w-full max-w-[1063px] h-[438px] bg-[#D1AE6F40]  rounded-tl-[60px] rounded-br-[50px] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl font-raleway">
        {/* Label */}
        <p className="text-[16px] text-[#242424] font-normal flex items-center bg-[#D1AE6F40] px-4 py-2 rounded-[8px] w-fit mx-auto">
          FOR PARTNERSHIPS
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-semibold text-[#003302] py-5">
          Looking to partner with us
        </h1>

        {/* Description */}
        <p className="text-center mx-auto w-5/6 pb-5">
          Explore meaningful ways to collaborate with NIIRIC — from
          strategic alliances and research partnerships to policy
          engagement and program support.
        </p>

        <div className="flex items-center justify-center">
        {/* Contact cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-5/6">
          
          {/* Email Card */}
          <div className="border border-[#00330257] rounded-[12px] p-4 w-full text-left">
            <div className="flex items-center gap-2 mb-2 font-raleway">
               <span className="bg-[#D1AE6F40] h-8 w-8 rounded-full  flex items-center justify-center">
                  <i className="fi-rr-envelope pt-2 text-[#003302] text-[16px]"></i>
                </span>
              <p className="font-medium">E-mail</p>
            </div>
            <p className="text-sm">info@impactinvestorsfoundation.org</p>
          </div>


          {/* Phone Card */}
          <div className="border border-[#00330257] rounded-[12px] p-4 w-full text-left">
            <div className="flex items-center gap-2 mb-2 font-raleway">
                <span className="bg-[#D1AE6F40] h-8 w-8 rounded-full  flex items-center justify-center">
                  
                  <i className="fi-rr-phone-call pt-2 text-[#003302] text-[16px]"></i>
                </span>
              <p className="font-medium">Phone</p>
            </div>
            <p className="text-sm font-raleway">+234 (808) 360 2223</p>
          </div>

        </div>
        </div>

      </div>
    </div>

      </div>
    </section>


    </GeneralLayout>
  );
}

export default Page;
