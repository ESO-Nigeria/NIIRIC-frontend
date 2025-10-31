"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowRight,
	EyeIcon,
	EyeOffIcon,
	LockIcon,
	MailIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Header02 from "@/components/blocks/header";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useResetPasswordMutation } from "@/store/features/auth/actions";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { handleApiError } from "@/helpers/handleApiErrors";

const formSchema = z.object({
	// email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	new_password: z.string().min(8, "New Password must be at least 8 characters long")
});

const SetNewPassword = () => {
	const {uid, token} = useParams()
	const [resetPassword, { isLoading }] = useResetPasswordMutation();
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			password: "",
			new_password: ""
		},
		resolver: zodResolver(formSchema),
	});
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const data_to_send = {
			"new_password1": data?.password,
				"new_password2": data?.new_password,
				"uid": uid,
				"token": token
		}
		try {
			const { data, error } = await resetPassword(data_to_send);
			if (error) {
				handleApiError(error)
			}
			if (data) {
				toast.success("Password changed successfully");
				form.reset();
				router.push("/auth/login");

			}
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<div>
			<Header02 />
			<div className="min-h-[80vh] flex items-center justify-center">
				<div className="w-full flex items-center justify-center h-full p-4">
					<div className="max-w-lg m-auto w-full flex flex-col items-center">
						<h4 className="text-primary-green text-[28px] font-bold">
							Set a new password
						</h4>
						<p className="mt-4 text-base font-normal tracking-tight">
							Please enter the email used to create your account
						</p>

						<Form {...form}>
							<form
								className="w-full mt-4 space-y-4"
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<div className="h-11 relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
													<LockIcon className="h-5 w-5 text-muted-foreground" />
													<Input
														type={showPassword ? "text" : "password"}
														placeholder="Password"
														className="border-0 focus-visible:ring-0 shadow-none"
														{...field}
													/>
													<button type="button" onClick={togglePasswordVisibility}>
														{showPassword ? (
															<EyeOffIcon className="h-5 w-5 text-muted-foreground" />
														) : (
															<EyeIcon className="h-5 w-5 text-muted-foreground" />
														)}
													</button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="new_password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<div className="h-11 relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
													<LockIcon className="h-5 w-5 text-muted-foreground" />
													<Input
														type={showPassword ? "text" : "password"}
														placeholder="Confirm Password"
														className="border-0 focus-visible:ring-0 shadow-none"
														{...field}
													/>
													<button type="button" onClick={togglePasswordVisibility}>
														{showPassword ? (
															<EyeOffIcon className="h-5 w-5 text-muted-foreground" />
														) : (
															<EyeIcon className="h-5 w-5 text-muted-foreground" />
														)}
													</button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div>
									<Button
										variant={"primary-green"}
										disabled={isLoading}
										type="submit"
										className="mt-4 h-11 w-full"
									>
										Submit
									</Button>
									<Link
										href="/auth/login"
										className="text-sm block mt-2 font-medium text-[#232E3F] "
									>
										Back to login{" "}
										<ArrowRight className="inline-flex text-sm size-3.5" />
									</Link>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SetNewPassword;
