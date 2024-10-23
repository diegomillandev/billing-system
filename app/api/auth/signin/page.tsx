"use client";

import { Loader } from "@/components/Loader";
import { userForm } from "@/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialState: userForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm({ defaultValues: initialState });

  const onSubmit = async (data: userForm) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.ok) {
        toast.success("Logged in successfully");
        setLoading(false);
        return router.push("/");
      }
      toast.error("An error occurred");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-10 md:pt-24 pb-10 md:pb-0 items-center min-h-screen flex-col bg-slate-900">
      <form
        className="bg-slate-800 p-8 w-11/12 max-w-[450px] rounded-md border border-slate-700"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-4xl text-center md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Billing System
          <span className="block text-lg font-extralight mt-1">Sign in</span>
        </h2>
        <div className="mb-6 relative">
          <label
            htmlFor="email"
            className="block font-light text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-1 rounded
                      focus:ring-blue-600 focus:border-transparent text-white 
                      placeholder:font-light  placeholder:text-gray-500
                      "
            placeholder="millandev@company.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block font-light text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type={false ? "text" : "password"}
            id="password"
            className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-1 rounded
                      focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-500"
            placeholder="•••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <div
            className="absolute top-1/2 right-1 transform translate-y-1 cursor-pointer text-gray-500 hover:text-gray-100 transition-colors"
            onClick={() => {
              // setShowPassword((prev) => !prev);
            }}
          >
            {/* {showPassword ? (
                          <BiHide className="text-2xl" />
                      ) : (
                          <BiShow className="text-2xl" />
                      )} */}
          </div>
        </div>

        <p className="text-gray-400 mb-4 text-right mt-6"></p>
        <button
          type="submit"
          className="w-full min-h-10 bg-blue-700 hover:bg-blue-600 text-white rounded-sm py-2 mt-3 flex items-center justify-center gap-x-2"
        >
          {!loading ? (
            <>
              <span>Sing in</span>
            </>
          ) : (
            <Loader />
          )}
        </button>
      </form>
    </div>
  );
}
