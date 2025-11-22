"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BookUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
	useGetUserResearchAreaQuery,
	useUpdateUserResearchAreaMutation,
	useEditUserResearchAreaMutation, // 👈 import your new edit mutation
} from "@/store/features/auth/actions";

// ✅ Validation schema
const formSchema = z.object({
	description: z.string().min(10, "Description must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

function ResearchArea() {
	const router = useRouter();
	const searchParam = useSearchParams();
	const edit = searchParam.get("edit");

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: "",
		},
	});
	const { control, handleSubmit, trigger, setValue } = form;

	const [open, setOpen] = useState(false);
	const [updateUserResearchArea] = useUpdateUserResearchAreaMutation();
	const [editUserResearchArea] = useEditUserResearchAreaMutation(); // 👈 edit mutation hook

	const shouldFetch = !!edit;
	const {
		data: userResearchArea,
		isLoading: researchAreaLoading,
		refetch: refetchResearchArea,
	} = useGetUserResearchAreaQuery({}, {
		skip: !shouldFetch,
	});

	const [selectedResearch, setSelectedResearch] = useState<any | null>(null);

	// ✅ Prefill the form when data is loaded
	useEffect(() => {
		if (edit && userResearchArea?.results?.length) {
			const first = userResearchArea?.results?.[0];
			setSelectedResearch(first);
			setValue("description", first?.description || "");
		}
	}, [edit, userResearchArea, setValue]);

	const onSubmit = async (values: FormValues) => {
		try {
			let response;
			if (edit && selectedResearch?.id) {
				// ✅ Update existing research area
				response = await editUserResearchArea({
					id: selectedResearch.id,
					body: values,
          description: values?.description
				});
			} else {
				// ✅ Create new research area
				response = await updateUserResearchArea(values);
			}

			const { data, error } = response as any;
			if (data) {
				toast.success(edit ? "Research area updated!" : "Research area added!");
        if (!edit) {
          router.push("/dashboard");
        }else{
          refetchResearchArea()
        }
			}
			if (error) {
				toast.error("Error saving research area");
			}
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	const handleOpenModal = async () => {
		const isValid = await trigger();
		if (isValid) {
			setOpen(true);
		} else {
			toast.error("Please fix form errors before submitting");
		}
	};

	// 🧠 Auto-resizing textarea logic
	const AutoResizeTextarea = ({ field }: any) => {
		const textareaRef = useRef<HTMLTextAreaElement | null>(null);
		const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const el = e.target;
			el.style.height = "auto";
			el.style.height = `${el.scrollHeight}px`;
			field.onChange(e);
		};
		useEffect(() => {
			if (textareaRef.current) {
				textareaRef.current.style.height = "auto";
				textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
			}
		}, []);
		return (
			<Textarea
				placeholder="Description of research area"
				{...field}
				onInput={handleInput}
				ref={textareaRef}
				className="focus-visible:ring-0 resize-none overflow-hidden"
			/>
		);
	};

	return (
		<Card className="shadow-none border-none p-7 font-poppins">
			<CardContent className="space-y-6 p-0">
				{/* Header */}
				<div>
					<div className="flex items-start gap-2 mb-2">
						<div className="rounded-xl bg-[#FEE4E2] text-[#D92D20] p-2 size-8 flex items-center">
							<BookUp className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-xl font-normal">Research Area</h2>
						</div>
					</div>
					<p className="text-sm text-gray-500">
						Connect with like minds by letting them know what you are working
						on.
					</p>
				</div>

				{/* Form */}
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Description */}
						<FormField
							control={control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base text-[#242424] font-normal">
										{edit ? "Edit Research Area" : "Current Research Area"}
									</FormLabel>
									<FormControl>
										<AutoResizeTextarea field={field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Display all research areas when edit=true */}
						{/* {edit && userResearchArea?.results?.length > 0 && (
							<div className="space-y-2">
								<h3 className="text-sm text-gray-600 font-medium">
									Other Research Areas
								</h3>
								<div className="space-y-3 border p-3 rounded-lg bg-gray-50">
									{userResearchArea?.results?.map((item: any) => (
										<div
											key={item.id}
											className={`p-3 rounded-md cursor-pointer ${
												selectedResearch?.id === item.id
													? "bg-green-100 border border-green-300"
													: "bg-white border"
											}`}
											onClick={() => {
												setSelectedResearch(item);
												setValue("description", item.description);
											}}
										>
											<p className="text-sm text-gray-700 leading-relaxed">
												{item.description}
											</p>
										</div>
									))}
								</div>
							</div>
						)} */}

						{/* Buttons */}
						<div className="flex justify-end gap-4">
							<Button
								type="button"
								variant="outline"
								className="w-[215px] font-normal"
								onClick={() => router.back()}
							>
								Cancel
							</Button>
							<Button
								type="button"
								onClick={handleOpenModal}
								variant="primary-green"
								className="w-[215px] font-normal"
							>
								{edit ? "Save Changes" : "Submit"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>

			{/* Confirm Modal */}
			<ConfirmModal
				open={open}
				setOpen={setOpen}
				title={edit ? "Confirm Update" : "Confirm Submission"}
				description={
					edit
						? "Are you sure you want to update your research area?"
						: "Are you sure you want to submit?"
				}
				confirmText={edit ? "Yes, Update" : "Submit"}
				cancelText="Back"
				onConfirm={handleSubmit(onSubmit)}
				note="When you click confirm, your research interest will be saved."
			/>
		</Card>
	);
}

export default ResearchArea;
