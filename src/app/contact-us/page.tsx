"use client";

import GeneralLayout from "@/layouts/General";
import { useRouter } from "next/navigation";
import ContactCard from "@/components/contact/ContactCard";
import PartnershipSection from "@/components/contact/PartnershipSection"
import { contactData } from "@/components/contact/contactData"
import  ContactForm from "@/components/contact/ContactForm"





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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactData.map((item, index) => (
              <ContactCard
                key={index}
                icon={item.icon}
                title={item.title}
                content={item.content}
                className={index === 2 ? "sm:col-span-2" : ""}
              />
            ))}
          </div>
          </div>
          <ContactForm />
       
        </div>

    </section>
    <PartnershipSection />


    </GeneralLayout>
  );
}

export default Page;
