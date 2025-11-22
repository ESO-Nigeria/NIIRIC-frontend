"use client";
import { Heart, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ConfirmModal } from "@/components/common/AlertModal";
import { SearchSelect } from "@/components/common/SearchSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
	useUpdateUserInterestsMutation,
	useGetUserInterestsQuery,
	useDeleteUserInterestMutation 
} from "@/store/features/auth/actions";
import { interestTopics } from "@/store/mockData/mockdata";

type FormValues = {
	interests: string[];
};

type UserInterest = {
	id: string;
	user: string;
	interest: string;
	interest_display: string;
	created_at: string;
	updated_at: string;
	user_email: string;
};

function InterestForm() {
	const searchParam = useSearchParams();
	const edit = searchParam.get("edit");
	const shouldFetch = !!edit;

	const { control, handleSubmit, trigger, setValue, watch } = useForm<FormValues>({
		defaultValues: { interests: [] },
	});

	const [open, setOpen] = useState(false);
	const [existingInterests, setExistingInterests] = useState<UserInterest[]>([]);
	const [updateUserInterests] = useUpdateUserInterestsMutation();
	const [deleteUserInterest] = useDeleteUserInterestMutation();

	const {
		data: userInterests,
		isLoading: interests_loading,
		refetch: refetchInterests,
	} = useGetUserInterestsQuery({ skip: !shouldFetch });

	const router = useRouter();

	// ✅ Load existing interests when in edit mode
	useEffect(() => {
		if (edit && userInterests && Array.isArray(userInterests?.results)) {
			setExistingInterests(userInterests?.results);
		}
	}, [edit, userInterests]);

	// ✅ Handle deleting existing interest
	const handleDeleteExisting = async (interestId: string) => {
		try {
			const { error } = await deleteUserInterest(interestId);
			if (error) {
				toast.error("Error deleting interest");
				return;
			}
			toast.success("Interest deleted successfully");
			// Remove from local state
			setExistingInterests((prev) => prev.filter((i) => i.id !== interestId));
			refetchInterests();
		} catch (error) {
			console.error(error);
			toast.error("Error deleting interest");
		}
	};

	const onSubmit = async (values: FormValues) => {
		// Only submit new interests (ones not already in existingInterests)
		const existingInterestValues = existingInterests.map((i) => i.interest);
		const newInterests = values.interests.filter(
			(interest) => !existingInterestValues.includes(interest)
		);

		if (newInterests.length === 0 && !edit) {
			toast.error("Please select at least one interest");
			return;
		}

		if (newInterests.length === 0 && edit) {
			// No new interests to add, just go back
			// router.push("/dashboard");
			toast.info("No new interests to add");
			return;
		}

		const payload = newInterests.map((interest) => ({
			interest,
		}));

		try {
			const { data, error } = await updateUserInterests(payload);
			if (data) {
				toast.success(
					edit
						? "New interests added successfully"
						: "Interests saved successfully"
				);
        if (!edit) {
          router.push("/dashboard");
        }else{
          refetchInterests();
        }

        setValue("interests", [])
			}
			if (error) {
				toast.error("Error saving interests");
			}
		} catch (error) {
			console.log(error, "error");
			toast.error("Error saving interests");
		}
	};

	const handleOpenModal = async () => {
		const isValid = await trigger();
		const newInterestsCount = watch("interests").length;
		
		if (!edit && newInterestsCount === 0) {
			toast.error("Please select at least one interest");
			return;
		}

		if (isValid) {
			setOpen(true);
		} else {
			toast.error("Please fix form errors before submitting");
		}
	};

	// Get the display name for an interest
	const getInterestDisplayName = (interestValue: string) => {
		const found = interestTopics.find((topic) => topic.value === interestValue);
		return found ? found.label : interestValue;
	};

	if (interests_loading) {
		return (
			<Card className="shadow-none border-none p-7 font-poppins">
				<CardContent className="p-0">
					<div className="flex items-center justify-center py-8">
						<p className="text-gray-500">Loading interests...</p>
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
						<div className="rounded-xl bg-[#D1E9FF] text-[#0086C9] p-2 size-8 flex items-center">
							<Heart className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-xl font-normal">
								{edit ? "Edit Research Interests" : "Research Interests"}
							</h2>
						</div>
					</div>
					<p className="text-sm text-gray-500">
						{edit
							? "Manage your areas of interest and expertise"
							: "Define your areas of interest and expertise to receive posts tailored specifically to you."}
					</p>
				</div>

				{/* Existing Interests (Edit Mode Only) */}
				{edit && existingInterests.length > 0 && (
					<div className="space-y-3">
						<h3 className="text-sm font-medium text-gray-700">
							Current Interests
						</h3>
						<div className="flex flex-wrap gap-2">
							{existingInterests.map((interest) => (
								<Badge
									key={interest.id}
									variant="secondary"
									className="px-3 py-2 text-sm flex items-center gap-2 bg-[#D1E9FF] text-[#0086C9] hover:bg-blue-100"
								>
									{interest.interest_display}
									<button
										type="button"
										onClick={() => handleDeleteExisting(interest.id)}
										className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
										aria-label={`Remove ${interest.interest_display}`}
									>
										<X className="h-3 w-3" />
									</button>
								</Badge>
							))}
						</div>
						<div className="border-t pt-4" />
					</div>
				)}

				{/* Form */}
				<form className="space-y-6">
					<div>
						{edit && (
							<h3 className="text-sm font-medium text-gray-700 mb-3">
								Add New Interests
							</h3>
						)}
						<SearchSelect
							control={control}
							name="interests"
							label={edit ? "" : "Interests"}
							options={interestTopics}
						/>
						{edit && (
							<p className="text-xs text-gray-500 mt-2">
								Select additional interests to add to your profile
							</p>
						)}
					</div>

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
							{edit ? "Add New Interests" : "Save Changes"}
						</Button>
					</div>
				</form>
			</CardContent>
			<ConfirmModal
				open={open}
				setOpen={setOpen}
				title="Confirm Changes"
				description={
					edit
						? "Are you sure you want to add these new interests?"
						: "Are you sure you want to submit?"
				}
				confirmText="Submit"
				cancelText="Back"
				onConfirm={handleSubmit(onSubmit)}
				note={
					edit
						? "When you click 'Submit', your new research interests will be added."
						: "When you click 'Submit', your research interests will be updated."
				}
			/>
		</Card>
	);
}

export default InterestForm;