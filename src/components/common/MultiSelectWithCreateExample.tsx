import React from "react";
import { useForm } from "react-hook-form";
import MultiSelectWithCreate from "./MultiSelectWithCreate";

type FormShape = {
	tags: string[];
	categories: string[];
};

export default function MultiSelectWithCreateExample() {
	const { handleSubmit, control, reset } = useForm<FormShape>({
		defaultValues: { tags: [], categories: [] },
	});

	const onSubmit = (data: FormShape) => {
		// In your real app replace with proper submit handling
		alert(JSON.stringify(data, null, 2));
	};

	return (
		<div className="p-6 bg-white rounded shadow-sm max-w-3xl">
			<h3 className="text-lg font-semibold mb-4">
				MultiSelectWithCreate — demo
			</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MultiSelectWithCreate
					label="Tags"
					name="tags"
					control={control}
					options={["Policy", "Research", "Funding"]}
				/>

				<MultiSelectWithCreate
					label="Categories"
					name="categories"
					control={control}
					options={[
						{ label: "Health", value: "health" },
						{ label: "Education", value: "education" },
					]}
				/>

				<div className="mt-4 flex gap-2">
					<button
						type="submit"
						className="px-4 py-2 bg-emerald-600 text-white rounded"
					>
						Submit
					</button>
					<button
						type="button"
						onClick={() => reset()}
						className="px-4 py-2 border rounded"
					>
						Reset
					</button>
				</div>
			</form>
			<p className="mt-4 text-sm text-gray-500">
				Note: control stores arrays of values (string[]).
			</p>
		</div>
	);
}
