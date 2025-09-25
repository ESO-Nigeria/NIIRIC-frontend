"use client"
import ContactCard from "@/components/contact/ContactCard"
import { contactData } from "@/components/contact/contactData"

export default function PartnershipSection() {
  return (
    <section className="flex items-center justify-center py-10">
      <div className="w-full max-w-[1227px] h-[588px] bg-[#F2F5F2] rounded-[32px] flex items-center justify-center">
        <div className="w-full max-w-[1063px] h-[438px] bg-[#D1AE6F40] rounded-tl-[60px] rounded-br-[50px] flex items-center justify-center px-6">
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

            {/* Contact cards */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-5/6">
                {contactData.slice(0, 2).reverse().map((item, index) => (
                  <ContactCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    content={item.content}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
