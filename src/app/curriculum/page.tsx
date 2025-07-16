// src/app/curriculum/page.tsx
"use client";

const imgEllipse253 =
	"http://localhost:3845/assets/5ad8cbc04275ce0a12af0fdc70244e4e46e47f9d.png";
const img =
	"http://localhost:3845/assets/0910d0b455c87218055471fba0ba9c4946783f64.svg";
const img1 =
	"http://localhost:3845/assets/f217b236eba4715a432dd11213ad30aade539d7f.svg";
const img2 =
	"http://localhost:3845/assets/affde98d585550bb4ac5d3c2629831b8a8dedfa9.svg";
const imgChevronDown =
	"http://localhost:3845/assets/b0b215bd3f88e59d2bf0c305451c1ba8740936b5.svg";
const img3 =
	"http://localhost:3845/assets/5878ef9ae247b78a80c621f69e9623c7552049bf.svg";
const img4 =
	"http://localhost:3845/assets/5df33b5553e7d9d680a03221251dbd53e2194ce3.svg";
const img5 =
	"http://localhost:3845/assets/c346cb0dacc9767647161e2e4aad58519e2946fc.svg";
const img6 =
	"http://localhost:3845/assets/efeee60c0f05721adee4879673a7adc52dc329fd.svg";

export default function CurriculumPage() {
	return (
		<div className="box-border content-stretch flex flex-col gap-8 items-center justify-start p-0 relative min-h-screen bg-[#f2f5f8]">
			<div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-full max-w-6xl mx-auto mt-8">
				{/* Top Bar */}
				<div className="box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative shrink-0 w-full">
					<div className="bg-white box-border flex flex-row gap-2 items-center justify-center px-4 py-2.5 rounded-md relative shrink-0 shadow-sm">
						<div className="absolute border border-[#dbe5f0] border-solid inset-[-1px] pointer-events-none rounded-md" />
						<div className="relative shrink-0 size-4">
							<img
								alt="settings"
								className="block max-w-none size-full"
								src={img}
							/>
						</div>
						<span className="font-medium text-[#094989] text-sm">
							Lesson Plan configuration
						</span>
					</div>
					<button className="flex flex-row gap-4 items-start justify-start p-0 relative shrink-0">
						<div className="bg-[#094989] flex flex-row gap-2 items-center justify-center px-4 py-2.5 rounded-md relative shrink-0">
							<div className="relative shrink-0 size-4">
								<img
									alt="notification"
									className="block max-w-none size-full"
									src={img1}
								/>
							</div>
							<span className="font-medium text-white text-sm">
								Request Lesson Plan
							</span>
						</div>
					</button>
				</div>
				{/* Filters */}
				<div className="box-border flex flex-row gap-3 items-center justify-start p-0 relative shrink-0">
					{/* Week Filter */}
					<div className="bg-white flex flex-row gap-2 h-8 items-center justify-center px-2 py-2.5 rounded-full relative shrink-0 shadow-sm">
						<div className="absolute border border-[#dbe5f0] border-solid inset-[-1px] pointer-events-none rounded-full" />
						<div className="flex flex-row gap-1 items-center">
							<div className="relative shrink-0 size-3">
								<img
									alt="calendar"
									className="block max-w-none size-full"
									src={img2}
								/>
							</div>
							<span className="font-medium text-[#0c0c0e] text-xs">Week 3</span>
						</div>
						<div className="relative shrink-0 size-4">
							<img
								alt="chevron down"
								className="block max-w-none size-full"
								src={imgChevronDown}
							/>
						</div>
					</div>
					{/* Class Filter */}
					<div className="bg-white flex flex-row gap-2 h-8 items-center justify-center pl-2 pr-0 py-0 rounded-full relative shrink-0 shadow-sm">
						<div className="absolute border border-[#dbe5f0] border-solid inset-[-0.5px] pointer-events-none rounded-full" />
						<span className="font-medium text-[#0c0c0e] text-sm">Class</span>
						<div className="bg-[#f2f5f8] flex flex-row gap-2 h-full items-center px-2 py-3 rounded-full">
							<span className="font-medium text-[#0c0c0e] text-sm">Jss 1</span>
							<div className="relative shrink-0 size-2">
								<img
									alt="arrow down"
									className="block max-w-none size-full"
									src={img3}
								/>
							</div>
						</div>
					</div>
					{/* Subject Filter */}
					<div className="bg-white flex flex-row gap-2 h-8 items-center justify-center pl-2 pr-0 py-0 rounded-full relative shrink-0 shadow-sm">
						<div className="absolute border border-[#dbe5f0] border-solid inset-[-0.5px] pointer-events-none rounded-full" />
						<span className="font-medium text-[#0c0c0e] text-sm">Subject</span>
						<div className="bg-[#f2f5f8] flex flex-row gap-2 h-full items-center px-2 py-3 rounded-full">
							<span className="font-medium text-[#0c0c0e] text-sm">All</span>
							<div className="relative shrink-0 size-2">
								<img
									alt="arrow down"
									className="block max-w-none size-full"
									src={img3}
								/>
							</div>
						</div>
					</div>
					{/* Status Filter */}
					<div className="bg-white flex flex-row gap-2 h-8 items-center justify-center pl-2 pr-0 py-0 rounded-full relative shrink-0 shadow-sm">
						<div className="absolute border border-[#dbe5f0] border-solid inset-[-0.5px] pointer-events-none rounded-full" />
						<span className="font-medium text-[#0c0c0e] text-sm">Status</span>
						<div className="bg-[#f2f5f8] flex flex-row gap-2 h-full items-center px-2 py-3 rounded-full">
							<span className="font-medium text-[#0c0c0e] text-sm">All</span>
							<div className="relative shrink-0 size-2">
								<img
									alt="arrow down"
									className="block max-w-none size-full"
									src={img3}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* Cards Row 1 */}
				<div className="flex flex-row gap-6 w-full">
					{/* Card 1 */}
					<div className="bg-white rounded-lg relative shrink-0 flex-1 shadow border border-[#cddbea]">
						<div className="flex flex-col gap-6 p-4 w-full">
							{/* Card Header */}
							<div className="flex flex-row gap-2 items-center pb-2 pt-1 w-full border-b border-[#f2f5f8]">
								<div className="relative shrink-0 size-4">
									<img
										alt="user"
										className="block max-w-none size-full"
										src={img4}
									/>
								</div>
								<span className="text-[#566676] text-sm">Uploaded by:</span>
								<div className="flex flex-row gap-2 items-center w-[155px]">
									<img
										alt="avatar"
										className="block max-w-none size-6"
										src={imgEllipse253}
									/>
									<span className="font-bold text-[#0c0c0e] text-sm">
										Jacob Jones
									</span>
								</div>
							</div>
							{/* Card Content */}
							<div className="flex flex-col gap-2.5 w-full">
								<div className="flex flex-row justify-between w-full">
									<div className="flex flex-col gap-1 w-[229px]">
										<span className="font-bold text-[#0c0c0e] text-lg">
											Introduction to Pain Theory
										</span>
										<span className="text-[#566676] text-xs truncate">
											Biology • 9th Grade
										</span>
									</div>
									<button className="rotate-270 size-5">
										<img
											alt="more"
											className="block max-w-none size-full"
											src={img5}
										/>
									</button>
								</div>
								<div className="bg-[rgba(248,166,10,0.2)] flex flex-row gap-2.5 items-center justify-center px-2 py-1 rounded">
									<span className="font-medium text-[#f8a60a] text-sm">
										Awaiting Feedback
									</span>
								</div>
							</div>
							{/* Card Footer */}
							<div className="flex flex-row gap-2 items-center w-full">
								<div className="flex flex-row gap-2 items-center w-[161px]">
									<img
										alt="document"
										className="block max-w-none size-4"
										src={img6}
									/>
									<span className="font-medium text-[#0c0c0e] text-xs">
										Week 3
									</span>
								</div>
								<span className="text-[#566676] text-xs">
									Uploaded on: 24-02-2024
								</span>
							</div>
							{/* Card Action */}
							<div className="flex flex-row justify-end w-full">
								<button className="bg-[#094989] text-white px-4 py-2 rounded font-medium text-xs">
									View Details
								</button>
							</div>
						</div>
					</div>
					{/* Card 2 (copy and adjust status as needed) */}
					<div className="bg-white rounded-lg relative shrink-0 flex-1 shadow border border-[#cddbea]">
						<div className="flex flex-col gap-6 p-4 w-full">
							{/* Card Header */}
							<div className="flex flex-row gap-2 items-center pb-2 pt-1 w-full border-b border-[#f2f5f8]">
								<div className="relative shrink-0 size-4">
									<img
										alt="user"
										className="block max-w-none size-full"
										src={img4}
									/>
								</div>
								<span className="text-[#566676] text-sm">Uploaded by:</span>
								<div className="flex flex-row gap-2 items-center w-[155px]">
									<img
										alt="avatar"
										className="block max-w-none size-6"
										src={imgEllipse253}
									/>
									<span className="font-bold text-[#0c0c0e] text-sm">
										Jacob Jones
									</span>
								</div>
							</div>
							{/* Card Content */}
							<div className="flex flex-col gap-2.5 w-full">
								<div className="flex flex-row justify-between w-full">
									<div className="flex flex-col gap-1 w-[229px]">
										<span className="font-bold text-[#0c0c0e] text-lg">
											Introduction to Pain Theory
										</span>
										<span className="text-[#566676] text-xs truncate">
											Biology • 9th Grade
										</span>
									</div>
									<button className="rotate-270 size-5">
										<img
											alt="more"
											className="block max-w-none size-full"
											src={img5}
										/>
									</button>
								</div>
								<div className="bg-[rgba(248,166,10,0.2)] flex flex-row gap-2.5 items-center justify-center px-2 py-1 rounded">
									<span className="font-medium text-[#f8a60a] text-sm">
										Pending Review
									</span>
								</div>
							</div>
							{/* Card Footer */}
							<div className="flex flex-row gap-2 items-center w-full">
								<div className="flex flex-row gap-2 items-center w-[161px]">
									<img
										alt="document"
										className="block max-w-none size-4"
										src={img6}
									/>
									<span className="font-medium text-[#0c0c0e] text-xs">
										Week 3
									</span>
								</div>
								<span className="text-[#566676] text-xs">
									Uploaded on: 24-02-2024
								</span>
							</div>
							{/* Card Action */}
							<div className="flex flex-row justify-end w-full">
								<button className="bg-[#094989] text-white px-4 py-2 rounded font-medium text-xs">
									View Details
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Cards Row 2 (repeat as needed for more cards) */}
				<div className="flex flex-row gap-6 w-full mt-6">
					{/* Card 3 */}
					<div className="bg-white rounded-lg relative shrink-0 flex-1 shadow border border-[#cddbea]">
						<div className="flex flex-col gap-6 p-4 w-full">
							{/* Card Header */}
							<div className="flex flex-row gap-2 items-center pb-2 pt-1 w-full border-b border-[#f2f5f8]">
								<div className="relative shrink-0 size-4">
									<img
										alt="user"
										className="block max-w-none size-full"
										src={img4}
									/>
								</div>
								<span className="text-[#566676] text-sm">Uploaded by:</span>
								<div className="flex flex-row gap-2 items-center w-[155px]">
									<img
										alt="avatar"
										className="block max-w-none size-6"
										src={imgEllipse253}
									/>
									<span className="font-bold text-[#0c0c0e] text-sm">
										Jacob Jones
									</span>
								</div>
							</div>
							{/* Card Content */}
							<div className="flex flex-col gap-2.5 w-full">
								<div className="flex flex-row justify-between w-full">
									<div className="flex flex-col gap-1 w-[229px]">
										<span className="font-bold text-[#0c0c0e] text-lg">
											Introduction to Pain Theory
										</span>
										<span className="text-[#566676] text-xs truncate">
											Biology • 9th Grade
										</span>
									</div>
									<button className="rotate-270 size-5">
										<img
											alt="more"
											className="block max-w-none size-full"
											src={img5}
										/>
									</button>
								</div>
								<div className="bg-[rgba(75,181,67,0.15)] flex flex-row gap-2.5 items-center justify-center px-2 py-1 rounded">
									<span className="font-medium text-[#4bb543] text-sm">
										Approved
									</span>
								</div>
							</div>
							{/* Card Footer */}
							<div className="flex flex-row gap-2 items-center w-full">
								<div className="flex flex-row gap-2 items-center w-[161px]">
									<img
										alt="document"
										className="block max-w-none size-4"
										src={img6}
									/>
									<span className="font-medium text-[#0c0c0e] text-xs">
										Week 3
									</span>
								</div>
								<span className="text-[#566676] text-xs">
									Uploaded on: 24-02-2024
								</span>
							</div>
							{/* Card Action */}
							<div className="flex flex-row justify-end w-full">
								<button className="bg-[#094989] text-white px-4 py-2 rounded font-medium text-xs">
									View Details
								</button>
							</div>
						</div>
					</div>
					{/* Card 4 (copy and adjust status as needed) */}
					<div className="bg-white rounded-lg relative shrink-0 flex-1 shadow border border-[#cddbea]">
						<div className="flex flex-col gap-6 p-4 w-full">
							{/* Card Header */}
							<div className="flex flex-row gap-2 items-center pb-2 pt-1 w-full border-b border-[#f2f5f8]">
								<div className="relative shrink-0 size-4">
									<img
										alt="user"
										className="block max-w-none size-full"
										src={img4}
									/>
								</div>
								<span className="text-[#566676] text-sm">Uploaded by:</span>
								<div className="flex flex-row gap-2 items-center w-[155px]">
									<img
										alt="avatar"
										className="block max-w-none size-6"
										src={imgEllipse253}
									/>
									<span className="font-bold text-[#0c0c0e] text-sm">
										Jacob Jones
									</span>
								</div>
							</div>
							{/* Card Content */}
							<div className="flex flex-col gap-2.5 w-full">
								<div className="flex flex-row justify-between w-full">
									<div className="flex flex-col gap-1 w-[229px]">
										<span className="font-bold text-[#0c0c0e] text-lg">
											Introduction to Pain Theory
										</span>
										<span className="text-[#566676] text-xs truncate">
											Biology • 9th Grade
										</span>
									</div>
									<button className="rotate-270 size-5">
										<img
											alt="more"
											className="block max-w-none size-full"
											src={img5}
										/>
									</button>
								</div>
								<div className="bg-[rgba(248,166,10,0.2)] flex flex-row gap-2.5 items-center justify-center px-2 py-1 rounded">
									<span className="font-medium text-[#f8a60a] text-sm">
										Pending Review
									</span>
								</div>
							</div>
							{/* Card Footer */}
							<div className="flex flex-row gap-2 items-center w-full">
								<div className="flex flex-row gap-2 items-center w-[161px]">
									<img
										alt="document"
										className="block max-w-none size-4"
										src={img6}
									/>
									<span className="font-medium text-[#0c0c0e] text-xs">
										Week 3
									</span>
								</div>
								<span className="text-[#566676] text-xs">
									Uploaded on: 24-02-2024
								</span>
							</div>
							{/* Card Action */}
							<div className="flex flex-row justify-end w-full">
								<button className="bg-[#094989] text-white px-4 py-2 rounded font-medium text-xs">
									View Details
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
