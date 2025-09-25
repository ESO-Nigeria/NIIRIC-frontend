"use client"

type ContactCardProps = {
  icon: string
  title: string
  content: string
  className?: string 
}




export default function ContactCard({ icon, title, content, className  }: ContactCardProps) {
  return (
    <>
        <div className={`border border-[#00330257] rounded-[12px] p-4 w-full ${className ?? ""}`}>
        <div className="flex items-center gap-2 mb-2 font-raleway">
          <span className="bg-[#D1AE6F40] h-8 w-8 rounded-full  flex items-center justify-center">
                  
          <i className={`${icon} pt-2 text-[#003302] text-[16px]`}></i>
          </span>
          <p className="font-medium">{title}</p>
        </div>
        <p className="text-sm">{content}</p>
      </div>
    </>
  )
}




