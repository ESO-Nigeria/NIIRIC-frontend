import { X } from "lucide-react";
import React from "react";

// Pixel-perfect uploaded file UI component (TypeScript + TailwindCSS)
// Designed to match the provided screenshot: a file upload row with progress bar, filename, size/percentage and a Remove button.

type UploadedFileProps = {
	filename?: string;
	size?: string;
	percent?: number;
	file?: File;
	removeFile?: (file?: File) => void;
	filePreviewUrl?: string;
};

const UploadedFile: React.FC<UploadedFileProps> = ({
	filename = "policy-pathways-toscale.pdf",
	size = "200KB",
	percent = 100,
	file,
	removeFile = () => {},
	filePreviewUrl = undefined,
}) => {
	const pct = Math.max(0, Math.min(100, percent));

	return (
		<div className="w-full  mx-auto">
			<div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-100">
				{/* Left: file icon + name & meta */}
				<div className="flex flex-1 items-center gap-4">
					{/* File thumbnail / icon square */}

					<div className="w-19 h-20 flex items-center justify-center bg-gray-50 rounded-md border border-gray-100">
						{/* Simple document SVG */}
						{filePreviewUrl ? (
							<iframe
								title="pdf-preview"
								src={filePreviewUrl || undefined}
								className="w-full h-full  border rounded"
							/>
							// <img src={filePreviewUrl} alt={filename} className="w-10 h-10 object-contain" />
						) : (
							<svg
								width="36"
								height="36"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden
							>
								<rect
									x="3"
									y="3"
									width="14"
									height="18"
									rx="2"
									fill="#F3F4F6"
								/>
								<path
									d="M17 7V3"
									stroke="#E5E7EB"
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M7 9h6"
									stroke="#9CA3AF"
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M7 12h6"
									stroke="#9CA3AF"
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
					</div>

					<div className="min-w-1/2">
						<div className="text-sm font-medium text-gray-900 truncate">
							{filename}
						</div>
						<div className="mt-2 ">
							{/* progress container */}
							<div className="flex items-center justify-between text-xs text-gray-500">
								<div>{size}</div>
								<div className="flex items-center gap-2">
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="text-emerald-600"
									>
										<path
											d="M20 6L9 17l-5-5"
											stroke="#10B981"
											strokeWidth="1.8"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span className="text-emerald-600 font-semibold">
										{pct}% - Completed
									</span>
								</div>
							</div>

							{/* Progress bar track */}
							<div className="mt-2 h-2 bg-green-50 rounded-full overflow-hidden">
								<div
									className={`h-2 bg-emerald-500 rounded-full transition-all duration-500`}
									style={{ width: `${pct}%` }}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Right: Remove button */}
				<div>
					<button
						type="button"
						onClick={() => removeFile(file)}
						className="inline-flex items-center w-[165px] h-11 justify-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
					>
						<X className="h-4 w-4 text-gray-500" />
						<span className="text-sm text-gray-700">Remove</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadedFile;
