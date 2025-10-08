"use client";

import dynamic from "next/dynamic";
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
	BookMarked,
	BookText,
	File,
	FileSearchIcon,
	Key,
	Notebook,
	NotebookTextIcon,
	UploadCloud,
	X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";
import { ConfirmModal } from "@/components/common/AlertModal";
import MultiSelectWithCreate from "@/components/common/MultiSelectWithCreate";
import PublicationUploadModal from "@/components/common/PublicationShareModal";
import RichTextEditor from "@/components/common/RichTextEditor";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button, buttonVariants } from "@/components/ui/button";
// shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadedFile from "@/components/uploadedfile";
import objectToFormData from "@/helpers/helpers";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { useGetAllPublishersProfileQuery } from "@/store/features/auth/actions";
import { selectCurrentUser } from "@/store/features/auth/selectors";
import { useUploadPublicationMutation } from "@/store/features/publications/actions";
import { publicationTypeOptions } from "@/store/mockData/mockdata";

const DEFAULT_OPTIONS = {
	sectors: [
		"Agriculture",
		"Education",
		"Mathematics",
		"Healthcare",
		"Finance",
		"Energy",
		"Policy",
		"Technology",
		"Other",
	],
	keywords: [
		"AI",
		"Sustainability",
		"Climate",
		"Quantum",
		"Machine Learning",
		"Data Science",
	],
	coAuthors: ["John Doe", "Jane Smith", "Alice Brown"],
	contributors: ["Michael Green", "Emily White", "David Black"],
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const publicationSchema = z.object({
	publicationTypes: z
		.array(z.string())
		.min(1, "At least one publication type is required"),
	title: z.string().min(1, "Title is required"),
	abstract: z.string().optional().nullable(),
	publicationDate: z.date().nullable(),
	doi: z.string().optional().nullable(),
	sectors: z.array(z.string()),
	keywords: z.array(z.string()),
	coAuthors: z.array(z.string()),
	contributors: z.array(z.string()),
	file: z
		.any()
		.refine((f) => !!f, "File is required")
		.refine((f) => f && f instanceof window.File, "File must be a single File")
		.refine((f) => f && f.type === "application/pdf", "Only PDF allowed")
		.refine((f) => f && f.size <= MAX_FILE_SIZE, `Max file size is 50MB`),
});

type FormValues = z.infer<typeof publicationSchema>;

/* -----------------------------
   Main Component
   ----------------------------- */
export default function UploadPublication(): JSX.Element {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(publicationSchema),
		mode: "onChange",
		defaultValues: {
			publicationTypes: ["Research"],
			title: "",
			abstract: "",
			publicationDate: null,
			doi: "",
			sectors: [],
			keywords: [],
			coAuthors: [],
			contributors: [],
			file: null,
		},
	});

	const fileRef = useRef<HTMLInputElement | null>(null);
	const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [pendingData, setPendingData] = useState<FormValues | null>(null);
	const [fileError, setFileError] = useState<string | null>(null);
	const router = useRouter();
	// auth slices vary in shape across the app; cast to any to avoid narrow inference issues here
	const user = useSelector(selectCurrentUser) as any;
	// profile is expected to be an array of publisher profiles; type as any[] | undefined for safety
	const profile = useSelector(
		(state: RootState) => state.auth.profile,
	) as unknown as any[] | undefined;
	const [uploadPublication, { isLoading }] = useUploadPublicationMutation();
	const [showModal, setShowModal] = useState(false);
	// upload response can be any shape; allow null initially
	const [publicationData, setPublicationData] = useState<any | null>(null);
	const params = {
		limit: 10,
		offset: 0,
		ordering: "-created_at",
		search: "",
		email: "",
		is_publisher: true,
		page: 1,
		page_size: 10,
		first_name: "",
		last_name: "",
	};
	// const [paramsState, setParamsState] = useState(params);
	// filtered profiles will be an array of publisher objects
	const [filtererdProfiles, setFilteredProfiles] = useState<any[]>([]);

	// Build query args and cast to any to satisfy the hook typing in this context
	const _queryArgs = { params, skip: !(user as any)?.is_superuser } as any;
	const {
		data: publishers,
		isLoading: publishersLoading,
		error,
	} = useGetAllPublishersProfileQuery(_queryArgs) as any;
	// console.log("profile", profile);
	// watch file in form
	const watchedFile = watch("file");

	useEffect(() => {
		if (
			typeof window !== "undefined" &&
			watchedFile &&
			watchedFile instanceof window.File
		) {
			const url = URL.createObjectURL(watchedFile);
			setFilePreviewUrl(url);
			setFileError(null);
			return () => {
				URL.revokeObjectURL(url);
			};
		} else {
			setFilePreviewUrl(null);
		}
	}, [watchedFile]);

	// Toggle Publication Type
	const publicationTypes = watch("publicationTypes") || [];
	function togglePublicationType(type: string) {
		const current = publicationTypes || [];
		if (current.includes(type)) {
			setValue(
				"publicationTypes",
				current.filter((t) => t !== type),
				{ shouldDirty: true },
			);
		} else {
			setValue("publicationTypes", [...current, type], { shouldDirty: true });
		}
	}

	// file change handler — only accept files (PDF)
	function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const f = e.target.files?.[0];
		if (!f) return;
		if (!f.type.includes("pdf")) {
			setFileError("Only PDF files are accepted");
			setValue("file", null, { shouldDirty: true });
			return;
		}
		if (f.size > MAX_FILE_SIZE) {
			setFileError("File size exceeds 50MB");
			setValue("file", null, { shouldDirty: true });
			return;
		}
		setFileError(null);
		setValue("file", f, { shouldDirty: true });
	}

	function removeFile() {
		setValue("file", null, { shouldDirty: true });
		setFilePreviewUrl(null);
		setFileError(null);
		if (fileRef.current) fileRef.current.value = "";
	}

	const onSubmitValidated: SubmitHandler<FormValues> = (data) => {
		setPendingData(data);
		setConfirmOpen(true);
	};

	async function submitConfirmed() {
		if (!pendingData) {
			setConfirmOpen(false);
			return;
		}

		// Prepare payload keys for backend expectations
		const payload: Record<string, any> = {
			...pendingData,
			author: profile?.[0]?.id ?? null,
			// map to backend names
			publication_date: pendingData.publicationDate
				? pendingData.publicationDate.toISOString().split("T")[0]
				: null,
			sector: "8ca46a20-f12b-4932-999b-6fb1f7946bbf", //pendingData.sectors[0],
			co_authors_ids: pendingData.coAuthors,
			collaborators_ids: pendingData.contributors,

			publication_types: pendingData.publicationTypes
				? pendingData.publicationTypes[0]
				: ["Research"],
			keywords: pendingData.keywords ? pendingData.keywords[0] : [],
			document: pendingData.file ?? null, // file is renamed 'document' for backend
			status: "published",
		};
		const formData = objectToFormData(payload);
		try {
			const data = await uploadPublication(formData).unwrap();
			console.log("Upload response", data);
			setPublicationData(data);
			setShowModal(true);
			// reset form
			reset();
			setPendingData(null);
			removeFile();
			// reset other fields if needed

			// show success toast
			toast.success("Publication uploaded successfully");
			setConfirmOpen(false);
		} catch (err) {
			console.error("Upload failed", err);
			toast.error("Upload failed. Check console for details.");
			setConfirmOpen(false);
		}
	}

	/* UI helpers for publication type buttons */
	const pubTypeButtons = useMemo(() => publicationTypeOptions, []);

	useEffect(() => {
		if (publishers && publishers.results) {
			// publishers.results items may be any shape; annotate p as any
			setFilteredProfiles(
				publishers.results.filter((p: any) => p.id !== profile?.[0]?.id),
			);
		} else {
			setFilteredProfiles([]);
		}
	}, [publishers]);
	console.log("publishers", publishers, filtererdProfiles);

	return (
		<DashboardLayout>
			<ConfirmModal
				open={confirmOpen}
				setOpen={setConfirmOpen}
				title="Confirm Changes"
				description="Are you sure you want to submit?"
				confirmText="Submit"
				cancelText="Back"
				onConfirm={submitConfirmed}
				isLoading={isLoading}
				note="When you click 'Submit', your publication will be uploaded."
			/>

			<div className="min-h-screen bg-gray-50 p-6">
				<form onSubmit={handleSubmit(onSubmitValidated)} className="mx-auto">
					<div className="mb-6 flex items-center justify-between">
						<h1 className="text-primary-green font-medium text-xl flex items-center gap-2">
							Upload Publication
						</h1>

						<div className="flex gap-2">
							<Button type="button" variant="outline" className="h-10 px-4">
								Cancel
							</Button>
							<Button
								type="submit"
								variant="primary-green"
								className="h-10 px-4"
								// disabled={!isValid}
							>
								Submit
							</Button>
						</div>
					</div>

					<Card className="p-6">
						<CardHeader>
							<CardTitle className="text-base font-normal flex items-center gap-2">
								<span className="bg-[#D1FADF] text-[#039855] p-2 rounded-lg flex items-center justify-center">
									<BookText className="w-4 h-4" />
								</span>
								Publication Type
							</CardTitle>
							<p className="text-sm text-[#667085]">
								You can select more than one type of publication you are
								uploading.
							</p>
						</CardHeader>

						<CardContent>
							<div className="flex gap-3 flex-wrap mb-4">
								{pubTypeButtons.map(({ label, icon: Icon, color }) => {
									const active = publicationTypes.includes(label);
									return (
										<button
											key={label}
											type="button"
											onClick={() => togglePublicationType(label)}
											className={cn(
												"px-4 py-2 rounded border flex items-center gap-2",
												active
													? "bg-white border-primary-green text-primary-green"
													: "bg-white border-gray-200 text-gray-700",
											)}
										>
											<span
												className={clsx(
													color,
													"p-2 rounded-lg flex items-center justify-center",
												)}
											>
												<Icon className="w-4 h-4" />
											</span>
											{label}
										</button>
									);
								})}
							</div>

							{/* Upload area */}
							<div className="mb-4">
								<Label className="mb-1.5 flex items-center gap-2">
									<span className="bg-[#FEF0C7] text-[#F79009] p-2 rounded-lg flex items-center justify-center">
										<UploadCloud className="w-4 h-4" />
									</span>
									Upload File (PDF only)
								</Label>
								<p className="text-sm text-[#667085] mb-2">
									Upload the main publication file (Max 50MB).
								</p>

								<input
									ref={fileRef}
									type="file"
									accept="application/pdf"
									id="file-upload"
									className="hidden"
									onChange={onFileChange}
								/>

								{/* If a file is selected show a preview card, else show dropzone */}
								{!filePreviewUrl ? (
									<label
										htmlFor="file-upload"
										className="cursor-pointer rounded-lg border-2 border-dashed p-6 flex flex-col items-center justify-center bg-gray-50"
									>
										<span className="text-gray-600 mb-2 flex items-center gap-2">
											<File className="w-5 h-5" /> Click to upload or drag and
											drop
										</span>
										<span className="text-sm text-gray-400 mb-2">
											Supported: PDF (Max 50MB)
										</span>
										<span
											className={
												buttonVariants({ variant: "primary-green" }) +
												" inline-block mt-2 px-3 py-1"
											}
										>
											Browse Files
										</span>
									</label>
								) : (
									<UploadedFile
										file={watchedFile as File}
										removeFile={removeFile}
										filePreviewUrl={filePreviewUrl}
										filename={(watchedFile as File)?.name}
										size={
											((watchedFile as File)?.size / 1024 / 1024).toFixed(2) +
											" MB"
										}
									/>
									// <div className="border rounded p-4 bg-white">
									//   <div className="flex items-center justify-between">
									//     <div>
									//       <p className="font-medium">
									//         {(watchedFile as File)?.name}
									//       </p>
									//       <p className="text-xs text-gray-500">
									//         {((watchedFile as File)?.size / 1024 / 1024).toFixed(
									//           2
									//         )}{" "}
									//         MB
									//       </p>
									//     </div>

									//     <div className="flex items-center gap-2">
									//       <Button
									//         type="button"
									//         variant="ghost"
									//         onClick={() => fileRef.current?.click()}
									//         className="h-9 px-3"
									//       >
									//         Replace
									//       </Button>
									//       <Button
									//         type="button"
									//         variant="outline"
									//         onClick={removeFile}
									//         className="h-9 px-3"
									//       >
									//         Remove
									//       </Button>
									//     </div>
									//   </div>

									//   {/* optional PDF preview small iframe (if required) */}
									//   <div className="mt-4">
									//     <iframe
									//       title="pdf-preview"
									//       src={filePreviewUrl || undefined}
									//       className="w-full h-48 border rounded"
									//     />
									//   </div>
									// </div>
								)}
								{/* File error message */}
								{fileError && (
									<p className="text-xs text-red-500 mt-1">{fileError}</p>
								)}
								{errors.file && (
									<p className="text-xs text-red-500 mt-1">
										{errors.file.message as string}
									</p>
								)}
							</div>

							{/* Publication details */}

							<div className="mb-4">
								<Label className="text-base mb-1.5">
									Title <span className="text-red-500">*</span>
								</Label>
								<Input
									{...register("title", { required: "Title is required" })}
									placeholder="Enter title"
									className="h-11"
								/>
								{errors.title && (
									<p className="text-xs text-red-500 mt-1">
										{errors.title.message}
									</p>
								)}
							</div>

							<div className="mb-4">
								<Label className="text-base mb-1.5">Abstract</Label>
								<Controller
									name="abstract"
									control={control}
									render={({ field }) => (
										<RichTextEditor
											value={field.value || ""}
											onChange={field.onChange}
										/>
									)}
								/>
								{errors.abstract && (
									<p className="text-xs text-red-500 mt-1">
										{errors.abstract.message as string}
									</p>
								)}
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="w-full">
									<Label className="text-base mb-1.5">
										Publication Date <span className="text-red-500">*</span>
									</Label>
									<Controller
										control={control}
										name="publicationDate"
										rules={{ required: "Publication date is required" }}
										render={({ field }) => (
											<DatePicker
												selected={field.value}
												onChange={(date) => field.onChange(date)}
												dateFormat="MM/yyyy"
												showMonthYearPicker
												className="w-full h-11 px-3 border rounded"
												placeholderText="MM/YYYY"
											/>
										)}
									/>
									{errors.publicationDate && (
										<p className="text-xs text-red-500 mt-1">
											{(errors.publicationDate as any).message}
										</p>
									)}
								</div>

								<div>
									<Label className="text-base mb-1.5">
										DOI / External Link
									</Label>
									<Input
										{...register("doi")}
										placeholder="Enter DOI or link"
										className="h-11"
									/>
									{errors.doi && (
										<p className="text-xs text-red-500 mt-1">
											{errors.doi.message as string}
										</p>
									)}
								</div>
							</div>

							{/* Multi-selects */}

							<MultiSelectWithCreate
								label="Sectors"
								name="sectors"
								control={control}
								options={DEFAULT_OPTIONS.sectors}
							/>
							{errors.sectors && (
								<p className="text-xs text-red-500 mt-1">
									{errors.sectors.message as string}
								</p>
							)}

							<MultiSelectWithCreate
								label="Keywords"
								name="keywords"
								control={control}
								options={DEFAULT_OPTIONS.keywords}
							/>
							{errors.keywords && (
								<p className="text-xs text-red-500 mt-1">
									{errors.keywords.message as string}
								</p>
							)}

							<MultiSelectWithCreate
								label="Co-Authors"
								name="coAuthors"
								control={control}
								options={filtererdProfiles.map((p) => ({
									label: `${p.first_name} ${p.last_name}`,
									value: p.id,
								}))}
							/>
							{errors.coAuthors && (
								<p className="text-xs text-red-500 mt-1">
									{errors.coAuthors.message as string}
								</p>
							)}

							<MultiSelectWithCreate
								label="Contributors"
								name="contributors"
								control={control}
								options={filtererdProfiles.map((p) => ({
									label: `${p.first_name} ${p.last_name}`,
									value: p.id,
								}))}
							/>
							{errors.contributors && (
								<p className="text-xs text-red-500 mt-1">
									{errors.contributors.message as string}
								</p>
							)}

							{/* actions */}
							<div className="mt-6 flex gap-4 justify-end">
								<Button type="button" variant="ghost" className="px-4 h-10">
									Save as draft
								</Button>
								<Button type="button" variant="outline" className="px-4 h-10">
									Cancel
								</Button>
								<Button
									type="submit"
									variant="primary-green"
									className="px-4 h-10"
									disabled={isLoading}
								>
									{isLoading ? "Uploading..." : "Submit"}
								</Button>
							</div>
						</CardContent>
					</Card>
				</form>
			</div>
			<PublicationUploadModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				publication={
					publicationData
						? {
								title: publicationData.title,
								abstract: publicationData.abstract,
								tags: publicationData.publication_types || [],
								thumbnail: publicationData.thumbnail || "",
								publicationLink: publicationData.document || "",
							}
						: {
								title: "",
								abstract: "",
								tags: [],
								thumbnail: "",
								publicationLink: "",
							}
				}
				onViewPaper={() =>
					router.push(`/dashboard/publications/${publicationData?.id}` || "/")
				}
			/>
		</DashboardLayout>
	);
}
