"use client";

import { Check, Trash2Icon, X } from "lucide-react";
import * as React from "react";
import { Control, Controller } from "react-hook-form";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";

type SearchSelectProps = {
	control: Control<any>;
	name: string;
	label?: string;
	options: {
		label: string;
		value: string;
	}[];
	loading?: boolean;
	// setSearchTerm?: (val: string) => void;
};

export function SearchSelect({
	control,
	name,
	label,
	options,
	loading = false,
	// setSearchTerm,
}: SearchSelectProps) {
	const [isSearching, setIsSearching] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="space-y-2" ref={containerRef}>
			{label && (
				<label htmlFor={name} className="text-sm font-medium">
					{label} <span className="text-red-500">*</span>
				</label>
			)}

			<Controller
				control={control}
				name={name}
				defaultValue={[]}
				render={({ field }) => {
					const safeValue: string[] = Array.isArray(field.value)
						? field.value
						: [];

					return (
						<div className="space-y-2">
							{/* Input + close button */}
							<div className="relative">
								<Command className="">
									<div className=" border rounded-md h-11 flex w-full items-center">
										<CommandInput
											className="h-11 w-full border-0 border-b-0"
											placeholder="Search for research interests"
											onFocus={() => setIsOpen(true)} // open on focus
											onValueChange={(val) => {
												// setSearchTerm(val);
												setIsSearching(val.trim().length > 0);
												setIsOpen(true);
											}}
										/>
										{isOpen && (
											<button
												type="button"
												onClick={() => setIsOpen(false)}
												className="absolute right-2 text-gray-500 hover:text-gray-700"
											>
												<X className="h-4 w-4" />
											</button>
										)}
									</div>

									{/* Dropdown list */}
									{isOpen && (
										<CommandList className="w-full mt-3 border  shadow-2xl rounded-md ">
											{loading && <div className="p-2 text-sm">Loading...</div>}

											{isSearching && options.length === 0 && (
												<CommandEmpty>No results found.</CommandEmpty>
											)}

											{options.map((item) => {
												const isSelected = safeValue.includes(item.value);
												return (
													<CommandItem
														className="w-full py-2.5 px-4"
														key={item.value}
														value={item.value}
														onSelect={(val) => {
															console.log(val, "select val");
															if (isSelected) {
																field.onChange(
																	safeValue.filter((i) => i !== val),
																);
															} else {
																field.onChange([...safeValue, val]);
															}
														}}
													>
														<div className="flex w-full justify-between items-center">
															<span>{item.label}</span>
															<span>{isSelected && <Check />}</span>
														</div>
													</CommandItem>
												);
											})}
										</CommandList>
									)}
								</Command>
							</div>

							{/* Selected tags */}
							<div className="flex flex-wrap gap-2">
								{safeValue.map((interest, idx) => (
									<span
										key={idx}
										className="flex items-center text-[#475467] capitalize gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm"
									>
										{interest.split("_").join(" ")}
										<button
											type="button"
											onClick={() =>
												field.onChange(safeValue.filter((i) => i !== interest))
											}
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
		</div>
	);
}
