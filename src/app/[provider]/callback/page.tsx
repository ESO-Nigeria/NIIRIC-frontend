"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Header02 from "@/components/blocks/header";
import { buttonVariants } from "@/components/ui/button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/features/auth/auth.slice";
import { useSocialVerifyLoginMutation } from "@/store/features/auth/actions";
import { toast } from "react-toastify";

export default function ProviderPage() {
  const dispatch = useDispatch()
  const { provider } = useParams()
   const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
	const email = searchParams.get("email");
  const auth_state = searchParams.get('state')
	// const { state } = useParams();
	let title = "Success";
	let description = "";
  const [socialVerifyLogin, {isLoading}] = useSocialVerifyLoginMutation()

	// switch (state) {
	// 	case "verification-sent":
	// 		title = "Verification Email Sent";
	// 		description = "Please check your inbox to verify your account.";
	// 		break;
	// 	case "reset-link-sent":
	// 		title = "Password Reset Email Sent";
	// 		description = "We’ve sent you a link to reset your password.";
	// 		break;
	// 	case "verified":
	// 		title = "Email Verification";
	// 		description = "Your email has been successfully verified.";
	// 		break;
	// 	default:
	// 		description = "Your request was successful.";
	// }

  // const verifyLogin = async () => {
  //   try {
  //     const response = await socialVerifyLogin({provider: `${provider}`,body: {state: auth_state, code: code, last_name: 'john', first_name: 'doe'}})
  //     console.log(response, 'response')
  //     //  dispatch(setCredentials(user?.data));
  //   } catch (error) {
  //     console.log(error, "error");
  //           toast.error("error");
  //   }
  // }
  // useEffect(() => {
  //   verifyLogin()
  // }, [code, auth_state])

    useEffect(() => {
    if (code && state) {
      // Call backend to exchange code for JWT
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/o/${provider}/?state=${state}&code=${code}`, {method: 'POST'})
        .then(res => res.json())
        .then(data => {
          if (data.access) {
            localStorage.setItem("authToken", data.access);
            toast.success("Logged in successfully!");
            router.push("/dashboard"); // redirect after login
          } else {
            toast.error("OAuth login failed");
          }
        });
    }
  }, [code, state, provider, router]);

  console.log(code, auth_state, 'hold')
	return (
		<div>
			<Header02 />
			<div className="min-h-[80vh] flex items-center justify-center">
				<div className="w-full flex items-center justify-center h-full p-4">
					<div className="max-w-lg m-auto space-y-4 w-full flex flex-col items-center">
						<h4 className="text-[28px] font-bold">{title}</h4>
						<div className="bg-[#F6FEF9] px-6 py-3  space-y-4 rounded-2xl text-center w-full">
							<h4 className="text-[#039855] text-[28px] font-bold">
								Successful
							</h4>
							<p className=" text-base font-normal tracking-tight">
								{description} <br /> {email}
							</p>
						</div>
						<Link
							href={"/auth/login"}
							className={clsx(
								buttonVariants({ variant: "primary-green" }),
								"mt-4 h-11 w-full",
							)}
						>
							Continue to login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
