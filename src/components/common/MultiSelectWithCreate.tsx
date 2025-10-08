import { Trash2Icon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Option type: either a simple string or an object with label and value
type Option = string | { label: string; value: string };

type Props = {
	label: string;
	name: string;
	control: any;
	options: Option[];
};

// Helper to normalize options to {label, value}
function normalizeOptions(options: Option[]) {
	return options.map((o) =>
		typeof o === "string" ? { label: o, value: o } : o,
	);
}

function MultiSelectWithCreate({ label, name, control, options }: Props) {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function onDoc(e: MouseEvent) {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(e.target as Node)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);

	const normalized = normalizeOptions(options);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value = [], onChange } }) => {
				// Ensure value is an array of strings (values)
				const selectedValues: string[] = Array.isArray(value) ? value : [];

				// Filtered list uses labels for search
				const filtered =
					query.trim() === ""
						? normalized
						: normalized.filter((o) =>
								o.label.toLowerCase().includes(query.toLowerCase()),
							);

				function addItemByLabel(labelOrValue: string) {
					// If input matches an existing option by value or label, resolve to the option value
					const match = normalized.find(
						(o) =>
							o.value === labelOrValue ||
							o.label.toLowerCase() === labelOrValue.toLowerCase(),
					);
					const valueToAdd = match ? match.value : labelOrValue;

					if (!selectedValues.includes(valueToAdd)) {
						onChange([...selectedValues, valueToAdd]);
					}
					setQuery("");
					setOpen(false);
				}

				function removeItem(valueToRemove: string) {
					onChange(selectedValues.filter((v) => v !== valueToRemove));
				}

				// Get label for a stored value
				function labelForValue(val: string) {
					const found = normalized.find((o) => o.value === val);
					return found ? found.label : val;
				}

				return (
					<div ref={containerRef} className="mb-4">
						<Label className="text-base mb-1.5">{label}</Label>
						<div className="relative">
							<Input
								value={query}
								onChange={(e) => {
									setQuery(e.target.value);
									setOpen(true);
								}}
								onFocus={() => setOpen(true)}
								placeholder={`Search or add ${label.toLowerCase()}`}
								className="focus-visible:ring-0 shadow-none h-11"
							/>

							{open && (
								<div className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-white shadow">
									{filtered.length === 0 && query !== "" ? (
										<div
                     onKeyDown={ (e) => {
                          if (e.key === 'Enter') {
                            addItemByLabel(query);
                            }
                        }}
                        tabIndex={0}
											className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
											onClick={() => addItemByLabel(query)}
										>
											Create "{query}"
										</div>
									) : (
										filtered.map((opt) => (
											<div
												key={opt.value}
                        onKeyDown={ (e) => {
                          if (e.key === 'Enter') {
                            addItemByLabel(opt.value);
                            }
                        }}
                        tabIndex={0}
												className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
												onClick={() => addItemByLabel(opt.value)}
											>
												{opt.label}
											</div>
										))
									)}
								</div>
							)}
						</div>

						<div className="mt-2 flex flex-wrap gap-2">
							{selectedValues.map((v: string) => (
								<span
									key={v}
									className="flex items-center text-[#475467] capitalize gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm"
								>
									{labelForValue(v)}
									<button
										type="button"
										onClick={() => removeItem(v)}
										className="text-gray-500 hover:text-gray-700 cursor-pointer"
									>
										<Trash2Icon className="h-3 w-3" />
									</button>
								</span>
							))}
						</div>
					</div>
				);
			}}
		/>
	);
}

export default MultiSelectWithCreate;
