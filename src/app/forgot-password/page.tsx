"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, MailIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
import { useSendResetPasswordEmailMutation } from "@/store/features/auth/actions";
import { handleApiError } from "@/helpers/handleApiErrors";

const formSchema = z.object({
	email: z.string().email(),
	// password: z.string().min(8, "Password must be at least 8 characters long"),
});

const ForgetPassword = () => {
	const [sendResetEmail, { isLoading }] = useSendResetPasswordEmailMutation();
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			email: "",
		},
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const { data, error } = await sendResetEmail(values);
			if (error) {
				handleApiError(error)
				// toast.error("Error sending email");
			}
			if (data) {
				toast.success("Reset Email sent, Please check your mailbox");
				form.reset();
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
							Forgot Password
						</h4>
						<p className="mt-4 text-base font-normal tracking-tight">
							Please enter the email used to create your account
						</p>

						<Form {...form}>
							<form
								className="w-full space-y-4"
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<div className="relative flex items-center h-11 rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
													<MailIcon className="h-5 w-5 text-muted-foreground" />
													<Input
														type="email"
														placeholder="Email"
														className="border-0 focus-visible:ring-0 shadow-none"
														{...field}
													/>
												</div>
											</FormControl>
											<FormDescription className="text-sm text-[#667085]">
												We’ll send you an email with the reset link
											</FormDescription>
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
										Request password request
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

export default ForgetPassword;
