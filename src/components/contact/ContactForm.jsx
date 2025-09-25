"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons"


export default function ContactForm() {
  return (
    <form className="w-2/3 border border-[#00330257] rounded-[8px] p-10 font-dmSans">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-[#F04438]">*</span>
                      </label>
                      <input 
                      required
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
                      required
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
                        required
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
                        required
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
                    required
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
                    required
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
                      Contact Us <ArrowRightIcon className="inline-block ml-2 w-4 h-4 text-white" />
                    </button>
                  </div>
              </form>
  )};