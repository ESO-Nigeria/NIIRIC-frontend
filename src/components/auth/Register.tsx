"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowBigLeft,
	ArrowRight,
	EyeIcon,
	EyeOffIcon,
	LockIcon,
	LucideLinkedin,
	MailIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRegisterMutation } from "@/store/features/auth/actions";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	re_password: z.string().min(8, "Password must be at least 8 characters long"),
	first_name: z.string().min(3, "First Name is required"),
	last_name: z.string(),
});

const Register = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			re_password: "",
			password: "",
		},
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	const [register, { isLoading }] = useRegisterMutation();

	// const { watch } = form;
	// const { email, password } = watch();

	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		const data_to_send = {
			email: values?.email,
			password1: values?.password,
			password2: values?.re_password,
			first_name: values?.first_name,
			last_name: values?.last_name,
		};
		try {
			const { data, error } = await register(data_to_send);
			console.log(data, "login");
			if (data) {
				router.push("/auth/success/verification-sent");
				form.reset();
				toast.success("Email sent");
			}
			if (error) {
				toast.error("Error registering");
			}
			// dispatch(setCredentials(user?.data));
		} catch (error) {
			console.log(error, "error");
			toast.error("Wrong username and password");
		}
	};

	return (
		<div className=" m-auto w-full flex flex-col items-center">
			<h4 className="text-primary-green text-[28px] font-bold">
				Create Account
			</h4>
			<p className="mt-4 text-base font-normal tracking-tight">
				Sign up to create account
			</p>

			<Button variant="outline" className="mt-8 w-full gap-3">
				<GoogleLogo />
				Continue with Google
			</Button>

			<Button variant="outline" className="mt-8 w-full gap-3">
				{/* <GoogleLogo /> */}
				<LucideLinkedin />
				Continue with LinkedIn
			</Button>
			<div className="my-7 w-full flex items-center justify-center overflow-hidden">
				<Separator className="flex-grow" />
				<span className="text-sm px-2 text-nowrap">OR Continue with email</span>
				<Separator className="flex-grow" />
			</div>

			<Form {...form}>
				<form
					className="w-full space-y-6"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="grid grid-cols-2 gap-6">
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<div className="relative flex items-center h-11 rounded-md border focus-within:ring-1 focus-within:ring-ring ">
											<Input
												type="text"
												placeholder="Enter your first name"
												className="border-0 focus-visible:ring-0 shadow-none"
												{...field}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<div className="relative flex items-center h-11 rounded-md border focus-within:ring-1 focus-within:ring-ring ">
											<Input
												type="text"
												placeholder="Enter your last name"
												className="border-0 focus-visible:ring-0 shadow-none"
												{...field}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
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

								<FormMessage />
							</FormItem>
						)}
					/>
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
						name="re_password"
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
							disabled={isLoading}
							type="submit"
							variant="primary-green"
							className="mt-4 w-full h-11"
						>
							Create Account
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

const GoogleLogo = () => (
	<svg
		width="1.2em"
		height="1.2em"
		id="icon-google"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="inline-block shrink-0 align-sub text-inherit size-lg"
	>
		<g clipPath="url(#clip0)">
			<path
				d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
				fill="#4285F4"
			></path>
			<path
				d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
				fill="#34A853"
			></path>
			<path
				d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
				fill="#FBBC04"
			></path>
			<path
				d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
				fill="#EA4335"
			></path>
		</g>
		<defs>
			<clipPath id="clip0">
				<rect width="15.6825" height="16" fill="white"></rect>
			</clipPath>
		</defs>
	</svg>
);

export default Register;
