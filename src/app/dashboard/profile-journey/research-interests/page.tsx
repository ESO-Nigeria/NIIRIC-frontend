"use client";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ConfirmModal } from "@/components/common/AlertModal";
import { SearchSelect } from "@/components/common/SearchSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUpdateUserInterestsMutation } from "@/store/features/auth/actions";
import { interestTopics } from "@/store/mockData/mockdata";

type FormValues = {
	interests: string[];
};

function Page() {
	const { control, handleSubmit, trigger } = useForm<FormValues>({
		defaultValues: { interests: [] },
	});

	const [open, setOpen] = useState(false);
	const [updateUserInterests] = useUpdateUserInterestsMutation();

	const router = useRouter();
	// debounce search term
	// useEffect(() => {
	//   const delayDebounce = setTimeout(() => {
	//     if (searchTerm.trim() !== "") {
	//       fetchOptions(searchTerm);
	//     } else {
	//       setOptions(ALL_INTERESTS);
	//     }
	//   }, 400);

	//   return () => clearTimeout(delayDebounce);
	// }, [searchTerm]);

	// async function fetchOptions(query: string) {
	//   try {
	//     setLoading(true);
	//     const res = await fetch(`/api/interests?search=${query}`);
	//     const data = await res.json();
	//     setOptions(data); // expecting array of strings
	//   } catch (err) {
	//     console.error("Error fetching interests:", err);
	//   } finally {
	//     setLoading(false);
	//   }
	// }

	const onSubmit = async (values: FormValues) => {
		const payload = values?.interests.map((interest) => ({
			interest,
		}));
		try {
			const { data, error } = await updateUserInterests(payload);
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
	};

	const handleOpenModal = async () => {
		const isValid = await trigger();
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
						<div className="rounded-xl bg-[#D1E9FF] text-[#0086C9] p-2 size-8 flex items-center">
							<Heart className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-xl font-normal">Research Interests</h2>
						</div>
					</div>
					<p className="text-sm text-gray-500">
						Define your areas of interest and expertise to receive posts
						tailored specifically to you.
					</p>
				</div>

				{/* Form */}
				<form className="space-y-6">
					<SearchSelect
						control={control}
						name="interests"
						label="Interests"
						options={interestTopics}
					/>

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
