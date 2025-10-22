"use client";

import * as Label from "@radix-ui/react-label";
import * as Checkbox from "@radix-ui/react-checkbox";
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";

export default function ContactForm() {
  return (
    <form className="w-full border border-[#00330257] rounded-[8px] p-10 font-dmSans">
      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        <div>
          <Label.Root
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="first-name"
          >
            First Name <span className="text-[#F04438]">*</span>
          </Label.Root>
          <input
            required
            id="first-name"
            type="text"
            placeholder="Enter first name"
            className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
          />
        </div>

        <div>
          <Label.Root
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="last-name"
          >
            Last Name <span className="text-[#F04438]">*</span>
          </Label.Root>
          <input
            required
            id="last-name"
            type="text"
            placeholder="Enter last name"
            className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        <div>
          <Label.Root
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email Address <span className="text-[#F04438]">*</span>
          </Label.Root>
          <div className="relative">
            <Slot className="fi-rr-envelope absolute left-3 top-4.5 w-5 h-5 text-gray-400" />
            <input
              required
              id="email"
              type="email"
              placeholder="Enter email address"
              className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <Label.Root
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="phone"
          >
            Phone Number <span className="text-[#F04438]">*</span>
          </Label.Root>
          <div className="relative">
            <Slot className="fi-rr-phone-call absolute left-3 top-4.5 w-5 h-5 text-gray-400" />
            <input
              required
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              className="w-full pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="mb-5">
        <Label.Root
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="subject"
        >
          Subject <span className="text-[#F04438]">*</span>
        </Label.Root>
        <input
          required
          id="subject"
          type="text"
          placeholder="Enter subject"
          className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
        />
      </div>

      {/* Message */}
      <div>
        <Label.Root
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="message"
        >
          Message <span className="text-[#F04438]">*</span>
        </Label.Root>
        <textarea
          id="message"
          rows={4}
          placeholder="Enter your message here"
          className="w-full px-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#1B4137] focus:outline-none"
        />
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2 my-5">
        <Checkbox.Root
          id="not-robot"
          required
          className="flex h-4 w-4 items-center justify-center border rounded focus:ring-[#1B4137] data-[state=checked]:bg-[#1B4137]"
        >
          <Checkbox.Indicator>
            <CheckIcon className="w-3 h-3 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Label.Root
          htmlFor="not-robot"
          className="text-sm text-gray-700 select-none"
        >
          I am not a robot
        </Label.Root>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="bg-[#1B4137] hover:bg-[#1B413795] w-[211px] h-[48px] cursor-pointer text-white font-normal py-2 px-4 rounded-[4px] transition"
        >
          Contact Us{" "}
          <ArrowRightIcon className="inline-block ml-2 w-4 h-4 text-white" />
        </button>
      </div>
    </form>
  );
}
