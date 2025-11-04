"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Pencil, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import { 
	useGetUserQualificationsQuery, 
	useUpdateUserQualificationMutation,
	useEditUserQualificationMutation,
	useDeleteUserQualificationMutation 
} from "@/store/features/auth/actions";
import { roles } from "@/store/mockData/mockdata";

// ✅ Schema
const qualificationSchema = z.object({
	id: z.string().optional(), // Track existing qualifications
	department: z.string().min(1, "Department is required"),
	position: z.string().min(1, "Position is required"),
	institution: z.string().min(1, "institution/Organization is required"),
});

const formSchema = z.object({
	qualifications: z.array(qualificationSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function QualificationForm() {
	const searchParam = useSearchParams();
	const edit = searchParam.get("edit");
	const [locked, setLocked] = useState<boolean[]>([]);
	const [updateUserQualification] = useUpdateUserQualificationMutation();
	const [editUserQualification] = useEditUserQualificationMutation();
	const [deleteUserQualification] = useDeleteUserQualificationMutation();
	const shouldFetch = !!edit;

	const {
		data: userQualifications,
		isLoading: qualifications_loading,
		refetch: refetchQualifications,
	} = useGetUserQualificationsQuery({ edit }, { skip: !shouldFetch });

	console.log('edit', edit, userQualifications);
	const router = useRouter();
	
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			qualifications: [{ department: "", position: "", institution: "" }],
		},
	});
	
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { fields, append, remove, replace } = useFieldArray({
		control: form.control,
		name: "qualifications",
	});

	// ✅ Populate form with existing qualifications when in edit mode
	useEffect(() => {
		if (edit && userQualifications && Array.isArray(userQualifications?.results)) {
			const mappedQualifications = userQualifications?.results.map((qual: any) => ({
				id: qual.id,
				department: qual.department,
				position: qual.position,
				institution: qual.institution,
			}));
			
			replace(mappedQualifications);
			// Lock all existing qualifications by default
			setLocked(new Array(mappedQualifications.length).fill(true));
		}
	}, [edit, userQualifications, replace]);

	// ✅ Handle individual qualification edit - updates immediately when locked
	const handleSaveIndividualEdit = async (index: number) => {
		const qualification = form.getValues(`qualifications.${index}`);
		
		// Validate this specific qualification
		const isValid = await form.trigger(`qualifications.${index}`);
		if (!isValid) {
			toast.error("Please fill all required fields");
			return;
		}

		if (qualification.id && edit) {
			// This is an existing qualification - update it via PATCH with id as query param
			try {
				const { data, error } = await editUserQualification({
					id: qualification.id, // This will be used as query param
					department: qualification.department,
					position: qualification.position,
					institution: qualification.institution,
				});

				if (error) {
					toast.error("Error updating qualification");
					return;
				}
				
				toast.success("Qualification updated successfully");
				lockBlock(index);
				refetchQualifications();
			} catch (error) {
				console.error(error);
				toast.error("Error updating qualification");
			}
		} else {
			// This is a new qualification - just lock it for now, will be created on final submit
			lockBlock(index);
		}
	};

	async function onSubmit(values: FormValues) {
		setIsSubmitting(true);
		try {
			// Filter out qualifications that don't have an ID (new ones)
			const newQualifications = values.qualifications.filter(qual => !qual.id);

			if (newQualifications.length > 0) {
				// Create new qualifications (without id field)
				const qualificationsToCreate = newQualifications.map(({ id, ...rest }) => rest);
				const { data, error } = await updateUserQualification(qualificationsToCreate);
				
				if (error) {
					toast.error("Error adding new qualifications");
					setIsSubmitting(false);
					return;
				}
				toast.success("New qualifications added successfully");
			}

			// If we're in edit mode and all existing qualifications were already updated individually
			if (edit) {
				toast.success("All changes saved successfully");
			}

			refetchQualifications();
			router.push("/dashboard");
		} catch (error) {
			console.log(error, "error");
			toast.error("Error processing qualifications");
		} finally {
			setIsSubmitting(false);
		}
	}

	const lockBlock = (index: number) => {
		setLocked((prev) => {
			const copy = [...prev];
			copy[index] = true;
			return copy;
		});
	};

	const unlockBlock = (index: number) => {
		setLocked((prev) => {
			const copy = [...prev];
			copy[index] = false;
			return copy;
		});
	};

	const handleDelete = async (index: number, qualificationId?: string) => {
		if (qualificationId && edit) {
			// Delete from backend if it's an existing qualification (id as query param)
			try {
				const { error } = await deleteUserQualification(qualificationId);
				if (error) {
					toast.error("Error deleting qualification");
					return;
				}
				toast.success("Qualification deleted successfully");
				refetchQualifications();
			} catch (error) {
				toast.error("Error deleting qualification");
				return;
			}
		}
		
		// Remove from form
		remove(index);
		setLocked((prev) => {
			const copy = [...prev];
			copy.splice(index, 1);
			return copy;
		});
	};

	const handleOpenModal = async () => {
		const isValid = await form.trigger();
		if (isValid) {
			setOpen(true);
		} else {
			toast.error("Please fix form errors before submitting");
		}
	};

	const handleAddNew = () => {
		append({
			department: "",
			position: "",
			institution: "",
		});
		setLocked((prev) => [...prev, false]);
	};

	if (qualifications_loading) {
		return (
			<Card className="shadow-none border-none p-7 font-poppins">
				<CardContent className="p-0">
					<div className="flex items-center justify-center py-8">
						<p className="text-gray-500">Loading qualifications...</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="shadow-none border-none p-7 font-poppins">
			<CardContent className="space-y-6 p-0">
				{/* Header */}
				<div>
					<div className="flex items-start gap-2 mb-2">
						<div className="rounded-xl bg-[#FEF0C7] text-[#DC6803] p-2 size-8 flex items-center">
							<GraduationCap className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-xl font-normal">
								{edit ? "Edit Qualifications" : "Add Qualification"}
							</h2>
						</div>
					</div>
					<p className="text-sm text-gray-500">
						{edit
							? "Update your educational background and degrees"
							: "Add your educational background and degrees"}
					</p>
				</div>

				{/* Form */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{fields.map((field, index) => {
							const isLocked = locked[index];
							const blockValid =
								form.watch(`qualifications.${index}.department`) &&
								form.watch(`qualifications.${index}.position`) &&
								form.watch(`qualifications.${index}.institution`);
							const qualificationId = form.watch(`qualifications.${index}.id`);

							return (
								<div key={field.id} className="space-y-4 relative">
									{/* Show if this is an existing or new qualification */}
									{edit && qualificationId && (
										<div className="text-xs text-gray-500 mb-2 font-medium">
											Existing Qualification
										</div>
									)}
									{edit && !qualificationId && (
										<div className="text-xs text-green-600 mb-2 font-medium">
											New Qualification
										</div>
									)}

									{/* Department + Position */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name={`qualifications.${index}.department`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Department <span className="text-red-500">*</span>
													</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															value={field.value}
															disabled={isLocked}
														>
															<SelectTrigger className="w-full !h-11 focus-visible:ring-0">
																<SelectValue placeholder="Select Department" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="computer_science">
																	Computer Science
																</SelectItem>
																<SelectItem value="engineering">Engineering</SelectItem>
																<SelectItem value="medicine">Medicine</SelectItem>
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`qualifications.${index}.position`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Position <span className="text-red-500">*</span>
													</FormLabel>
													<FormControl>
														<Select
															onValueChange={field.onChange}
															value={field.value}
															disabled={isLocked}
														>
															<SelectTrigger className="w-full !h-11 focus-visible:ring-0">
																<SelectValue placeholder="Select Position" />
															</SelectTrigger>
															<SelectContent>
																{roles.map((role) => (
																	<SelectItem
																		key={role.value}
																		value={role.value}
																	>
																		{role.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									{/* institution */}
									<FormField
										control={form.control}
										name={`qualifications.${index}.institution`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Institution or Organization{" "}
													<span className="text-red-500">*</span>
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Enter name"
														{...field}
														className="h-11 focus-visible:ring-0"
														disabled={isLocked}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Action Buttons */}
									<div className="flex justify-end gap-3">
										{fields.length > 1 && (
											<Button
												type="button"
												variant="outline"
												className="w-[215px] text-destructive border-destructive"
												onClick={() => handleDelete(index, qualificationId)}
											>
												Delete
											</Button>
										)}
										{!isLocked ? (
											<Button
												type="button"
												variant="primary-green"
												className="w-[215px]"
												disabled={!blockValid}
												onClick={() => handleSaveIndividualEdit(index)}
											>
												{qualificationId && edit ? "Update" : "Save Changes"}
											</Button>
										) : (
											<Button
												type="button"
												variant="primary-green"
												className="w-[215px]"
												onClick={() => unlockBlock(index)}
											>
												<Pencil className="h-4 w-4 mr-1" /> Edit
											</Button>
										)}
									</div>

									{/* Separator */}
									<div className="border-t pt-4 mt-4" />
								</div>
							);
						})}

						{/* Final Submit */}
						<div className="flex justify-end gap-4">
							<Button
								type="button"
								variant="ghost"
								className="flex-1 text-primary-green"
								onClick={handleAddNew}
								disabled={locked.length > 0 && !locked[locked.length - 1]}
							>
								<Plus className="h-4 w-4 mr-1" /> Add Another Qualification
							</Button>
							<Button 
								type="button" 
								variant="outline" 
								className="w-[215px]"
								onClick={() => router.back()}
							>
								Cancel
							</Button>
							<Button
								type="button"
								onClick={handleOpenModal}
								variant="primary-green"
								className="w-[215px]"
								disabled={isSubmitting || (locked.length > 0 && !locked.every(Boolean))}
							>
								{isSubmitting ? "Saving..." : edit ? "Save New Qualifications" : "Save All Changes"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
			<ConfirmModal
				open={open}
				setOpen={setOpen}
				title="Confirm Changes"
				description={
					edit
						? "Are you sure you want to save the new qualifications?"
						: "Are you sure you want to submit?"
				}
				confirmText="Submit"
				cancelText="Back"
				onConfirm={form.handleSubmit(onSubmit)}
				note={
					edit
						? "Existing qualifications have been updated. New qualifications will be created."
						: "When you click 'Submit', your qualifications will be saved."
				}
			/>
		</Card>
	);
}