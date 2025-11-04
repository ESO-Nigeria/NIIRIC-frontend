"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BookUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { ConfirmModal } from "@/components/common/AlertModal";
import { SearchSelect } from "@/components/common/SearchSelect";
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
import { useGetUserResearchAreaQuery, useUpdateUserResearchAreaMutation } from "@/store/features/auth/actions";

// ✅ Validation schema
const formSchema = z.object({
	description: z
		.string()
		.min(10, "Description must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

function Page() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: "",
		},
	});
	const searchParam = useSearchParams();
	const edit = searchParam.get("edit");
	const { control, handleSubmit, trigger } = form;
	const [open, setOpen] = useState(false);
	const [updateUserResearchArea] = useUpdateUserResearchAreaMutation();
	const shouldFetch = !!edit;
	const {
    data: userResearchArea,
    isLoading: researchAreaLoading,
    refetch: refetchResearchArea,
  } = useGetUserResearchAreaQuery({ skip: !shouldFetch });
	const router = useRouter();

	const onSubmit = async (values: FormValues) => {
		try {
			const { data, error } = await updateUserResearchArea(values);
			if (data) {
				router.push("/dashboard");
				toast.success("successful");
			}
			if (error) {
				toast.error("Error saving");
			}
		} catch (error) {
			console.log(error, "error");
			toast.error("Error registering");
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

	console.log('userResearchArea', userResearchArea)
	
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
						{/* Description field */}
						{/* <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#242424] font-normal">
                    Current Research Area
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description of research area"
                      rows={15}
                      
                      {...field}
                      className="focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
						<FormField
							control={control}
							name="description"
							render={({ field }) => {
								const textareaRef = useRef<HTMLTextAreaElement | null>(null);

								// Auto resize on change
								const handleInput = (
									e: React.ChangeEvent<HTMLTextAreaElement>,
								) => {
									const el = e.target;
									el.style.height = "317px"; // reset height
									el.style.height = `${el.scrollHeight}px`; // set to content height
									field.onChange(e);
								};

								// Run once on mount for default value
								useEffect(() => {
									if (textareaRef.current) {
										textareaRef.current.style.height = "auto";
										textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
									}
								}, []);

								return (
									<FormItem>
										<FormLabel className="text-base text-[#242424] font-normal">
											Current Research Area
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Description of research area"
												{...field}
												onInput={handleInput}
												ref={textareaRef}
												className="focus-visible:ring-0 resize-none overflow-hidden"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						{/* Interests field */}

						{/* Buttons */}
						<div className="flex justify-end gap-4">
							<Button
								type="button"
								variant="outline"
								className="w-[215px] font-normal"
							>
								Cancel
							</Button>
							<Button
								type="button"
								onClick={handleOpenModal}
								variant="primary-green"
								className="w-[215px] font-normal"
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
				onConfirm={handleSubmit(onSubmit)}
				note="When you click 'Yes, Submit', your research interest will be updated."
			/>
		</Card>
	);
}

export default Page;
