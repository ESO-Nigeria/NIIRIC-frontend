"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Contact2, Mail, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";
import { ConfirmModal } from "@/components/common/AlertModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	useEditUserProfileMutation,
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
} from "@/store/features/auth/actions";
import { selectCurrentUser } from "@/store/features/auth/selectors";
import { NIGERIA_STATES } from "@/store/mockData/mockdata";

const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z
		.string()
		.trim()
		.toLowerCase()
		.email({ message: "Invalid email address" }),
	phone: z
		.string()
		.min(10, "Phone number is required")
		// optional: ensure digits, spaces, plus and hyphen allowed
		.refine((val) => /^[\d+\-\s()]+$/.test(val), "Enter a valid phone number"),
	linkedin: z
		.string()
		.min(1, "LinkedIn is required")
		.regex(/^https?:\/\/(www\.)?linkedin\.com\/.*$/i, {
			message: "Enter a valid LinkedIn profile or company URL",
		}),
	orcid: z
		.string()
		.optional()
		.refine(
			(val) =>
				!val || /^https?:\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{4}$/.test(val),
			{
				message:
					"Enter a valid ORCID URL (https://orcid.org/0000-0000-0000-0000)",
			},
		),
	state: z.string().min(1, "State is required"),
	bio: z.string().max(5000, "Bio cannot exceed 5000 characters"),
	profilePicture: z.any().optional(),
	// .refine((file) => file instanceof File, "Profile picture is required")
	// .refine(
	//   (file) => file?.size <= 1024 * 1024,
	//   "File must be less than 1MB"
	// )
	// .refine(
	//   (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
	//   "Only JPG, PNG, or GIF allowed"
	// ),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProfileCompletionForm() {
	const [bioCount, setBioCount] = useState(0);
	const [preview, setPreview] = useState<string | null>(null);
	const [updateUserProfile] = useUpdateUserProfileMutation();
	const [editUserProfile] = useEditUserProfileMutation();
	const { data: userProfile } = useGetUserProfileQuery({});
	const router = useRouter();
	const searchParam = useSearchParams();
	const id = searchParam.get("id");
	const user = useSelector(selectCurrentUser);
	// const user_data = useSelector(getUser)
	// const [profile, setProfile] = useState
	const [open, setOpen] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			linkedin: "",
			orcid: "",
			state: "",
			bio: "",
			profilePicture: undefined,
		},
	});

	useEffect(() => {
		const user_data = id ? userProfile?.[0] : user;
		if (user_data) {
			form.reset({
				title: user_data?.title || "",
				firstName: user_data?.first_name || "",
				lastName: user_data?.last_name || "",
				email: user_data?.email || "",
				phone: user_data?.phone_number || "",
				linkedin: user_data?.linkedin_url || "",
				orcid: user_data?.orcid || "",
				state: user_data?.state || "",
				bio: user_data?.bio || "",
				profilePicture: undefined,
			});
			setBioCount(user_data?.bio?.length || 0);
			// if (user_data?.profilePicture) setPreview(user_data.profilePicture);
		}
	}, [userProfile, user, id]);

	const onSubmit = async (values: FormValues) => {
		const data_to_send = {
			title: values?.title,
			first_name: values?.firstName,
			last_name: values?.lastName,
			email: values?.email,
			phone_number: values?.phone,
			linkedin_url: values?.linkedin,
			orcid: values?.orcid,
			state: values?.state,
			bio: values?.bio,
			id: id ? id : null,
		};
		try {
			const { data, error } = await (id
				? editUserProfile(data_to_send)
				: updateUserProfile(data_to_send));
			if (data) {
				router.push("/dashboard");
				toast.success("successful");
			}
			if (error) {
				toast.error("Error registering");
			}
		} catch (error) {
			console.log(error, "error");
			toast.error("Error registering");
		}
		console.log("✅ Form Submitted:", values);
	};

	const handleOpenModal = async () => {
		const isValid = await form.trigger();
		if (isValid) {
			setOpen(true);
		} else {
			toast.error("Please fix form errors before submitting");
		}
	};

	return (
		<Card className="shadow-none border-none p-7 font-poppins">
			<CardContent className="space-y-6 p-0">
				{/* Header */}
				<div>
					<div className="flex items-start gap-2 mb-2">
						<div className="rounded-xl bg-green-100 p-2 size-8 flex items-center">
							<Contact2 className="h-5 w-5 text-green-700" />
						</div>
						<div>
							<h2 className="text-xl font-normal">Profile Completion</h2>
						</div>
					</div>
					<p className="text-sm text-gray-500">
						Complete all sections to unlock the features of the NIIRIC Platform
					</p>
				</div>

				{/* Form */}
				<Form {...form}>
					<form className="space-y-6">
						<FormField
							control={form.control}
							name="profilePicture"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="rounded-md border border-gray-200  p-6 flex  items-start gap-4 ">
											{preview ? (
												<div className="relative h-24 w-24 rounded-full overflow-hidden">
													<Image
														src={preview}
														alt="Profile Preview"
														fill
														className="object-cover"
													/>
												</div>
											) : (
												<div className="relative h-24 w-24 bg-gray-200 flex items-center justify-center rounded-full overflow-hidden border">
													<UploadCloud className="h-10 w-10 text-gray-400" />
												</div>
											)}
											<div className="space-y-2">
												<input
													type="file"
													accept="image/png,image/jpeg,image/gif"
													className="hidden"
													id="fileInput"
													onChange={(e) => {
														const file = e.target.files?.[0];
														if (file) {
															field.onChange(file);
															setPreview(URL.createObjectURL(file));
														}
													}}
												/>
												<label
													htmlFor="fileInput"
													className="cursor-pointer text-base mb-4 text-[#3F434A] font-medium "
												>
													{preview ? "Change Photo" : "Upload Photo"}
												</label>
												<p className="text-sm text-[#3F434A] ">
													Upload a professional photo. This will be visible to
													other researchers
												</p>
												<p className="text-sm text-[#98A2B3]">
													Recommended: Square image, at least 400x400px. JPG,
													PNG, GIF (Max 1mb)
												</p>
											</div>
											<input
												type="file"
												accept="image/png,image/jpeg,image/gif"
												className="hidden"
												id="fileInput"
												onChange={(e) => {
													const file = e.target.files?.[0];
													if (file) {
														field.onChange(file);
														setPreview(URL.createObjectURL(file));
													}
												}}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Title */}
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base text-[#242424] font-normal ">
										Title
									</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className="w-1/2 !h-11 focus-visible:ring-0">
												<SelectValue placeholder="Select Title" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="mr">Mr</SelectItem>
											<SelectItem value="mrs">Mrs</SelectItem>
											<SelectItem value="dr">Dr</SelectItem>
											<SelectItem value="prof">Prof</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* First & Last Name */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base text-[#242424] font-normal ">
											First Name<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="First Name"
												{...field}
												className="h-11 focus-visible:ring-0"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base text-[#242424] font-normal ">
											Last Name<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Last Name"
												{...field}
												className="h-11 focus-visible:ring-0"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Email & Phone */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base text-[#242424] font-normal ">
											Email Address
										</FormLabel>
										<FormControl>
											<div className="flex items-center border rounded-md px-3">
												<Mail className="h-4 w-4 text-gray-400" />
												<Input
													disabled
													type="email"
													className="border-0 focus-visible:ring-0 h-11"
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base text-[#242424] font-normal ">
											Phone Number
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter Phone Number"
												{...field}
												className="h-11 focus-visible:ring-0"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* LinkedIn, ORCID, State */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<FormField
								control={form.control}
								name="linkedin"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base text-[#242424] font-normal ">
											LinkedIn Url<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="linkedin.com/profile-name"
												{...field}
												className="h-11 focus-visible:ring-0"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="orcid"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base text-[#242424] font-normal ">
											ORCID
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter ORCID"
												{...field}
												className="h-11 focus-visible:ring-0"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel className="text-base text-[#242424] font-normal ">
											State<span className="text-red-500">*</span>
										</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger className="w-full !h-11 focus-visible:ring-0">
													<SelectValue placeholder="Select State" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{NIGERIA_STATES.map((state) => (
													<SelectItem key={state.value} value={state.value}>
														{state.label}
													</SelectItem>
												))}

												{/* <SelectItem value="abuja">Abuja</SelectItem>
                        <SelectItem value="rivers">Rivers</SelectItem> */}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Bio */}
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base text-[#242424] font-normal ">
										Bio
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Brief description about yourself"
											{...field}
											onChange={(e) => {
												field.onChange(e);
												setBioCount(e.target.value.length);
											}}
											className="focus-visible:ring-0"
										/>
									</FormControl>
									<div className="flex justify-between">
										<FormMessage />
										<p className="text-xs text-gray-500">
											{bioCount}/5,000 Characters
										</p>
									</div>
								</FormItem>
							)}
						/>

						{/* Buttons */}
						<div className="flex justify-end gap-3">
							<Button
								disabled
								className="w-[215px]"
								variant="outline"
								type="button"
							>
								Cancel
							</Button>
							<Button
								type="button"
								onClick={handleOpenModal}
								variant={"primary-green"}
								className="w-[215px] text-white"
							>
								Save Changes
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>

			<ConfirmModal
				open={open}
				setOpen={setOpen}
				title="Confirm Changes"
				description="Are you sure you want to submit?"
				confirmText="Submit "
				cancelText="Back"
				onConfirm={form.handleSubmit(onSubmit)}
				note="When you click 'Yes, Submit', your profile will be updated."
			/>
		</Card>
	);
}
