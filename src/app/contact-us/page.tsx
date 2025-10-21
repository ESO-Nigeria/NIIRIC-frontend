"use client";

import GeneralLayout from "@/layouts/General";
import { useRouter } from "next/navigation";
import ContactCard from "@/components/contact/ContactCard";
import PartnershipSection from "@/components/contact/PartnershipSection";
import { contactData } from "@/components/contact/contactData";
import ContactForm from "@/components/contact/ContactForm";
import InfoHero from "@/components/blocks/infoHero";

function Page() {
  const router = useRouter();

  return (
    <GeneralLayout>
      <InfoHero
        tag="CONTACT US"
        title="Get in touch with NIIRIC"
        description="We are here to support you. Reach out to us for inquiries."
        imageUrl="/assets/images/DSC_9458.png"
        imageAlt="Contact Us Banner Image"
      />
<section className="my-20 px-5 sm:px-10 lg:px-20">
  <div className="flex flex-col lg:flex-row gap-8 w-full">
    {/* Left Section */}
    <div className="w-full lg:w-1/2">
      <h1 className="font-medium text-[28px] text-[#003302] font-poppins">
        Connect with us today!
      </h1>
      <p className="py-5 text-[#242424] font-raleway">
        We are here to support you. Reach out to us for inquiries.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Right Section (Contact Form) */}
          <div className="flex items-center justify-center">

        <ContactForm />
          </div>

  </div>
</section>


      <PartnershipSection />
    </GeneralLayout>
  );
}

export default Page;
