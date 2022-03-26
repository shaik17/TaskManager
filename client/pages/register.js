import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import Notiflix from "notiflix";
import { registerUser } from "../service/auth.service";

function Register() {
  const router = useRouter();
  const schema = yup.object({
    email: yup.string().required().email(),
    name: yup.string().required("name is a required field"),
    password: yup.string().min(6),
    confirmpassword: yup
      .string()
      .required("confirm password field is Required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onsubmit = async (data) => {
    Notiflix.Loading.pulse("Loading..");
    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        Notiflix.Notify.success("Regsiter successfully");
        router.push("/");
      }
    } catch (error) {
      Notiflix.Notify.failure(error.response.data);
    } finally {
      Notiflix.Loading.remove();
    }
  };

  return (
    <div>
      <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 mt-12">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign Up to your account
              </h3>
            </div>
            <form
              className="space-y-6 mt-12 rounded-md shadow-md py-5 px-4 "
              onSubmit={handleSubmit(onsubmit)}
              method="POST"
            >
              <div className="mb-3">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 px-3 py-2 placeholder:italic bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-green-400 focus:border-sky-600 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                </label>

                <div className="mt-2 mb-2 text-danger">
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
              </div>
              <div className="mb-3">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 px-3 py-2 placeholder:italic bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-green-400  focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="enter your name"
                    {...register("name")}
                  />
                </label>
                <div className="mt-2 mb-2 text-danger">
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
              </div>
              <div className="mb-3">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    className="mt-1 px-3 py-2 placeholder:italic bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-green-400  focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="password"
                    {...register("password")}
                  />
                </label>
                <div className="mt-2 mb-2 text-danger">
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>
              <div className="mb-3">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    Confirm Password
                  </span>
                  <input
                    type="password"
                    name="confirmpassword"
                    className="mt-1 placeholder:italic px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-green-400  focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="confirm password"
                    {...register("confirmpassword")}
                  />
                </label>
                <div className="mt-2 mb-2 text-danger">
                  {errors.confirmpassword && (
                    <p>{errors.confirmpassword.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Sign in
                </button>
              </div>
              <div className="mt-4 text-sm text-center cursor-pointer">
                Already have an Account?
                <Link href="/">
                  <span className="text-indigo-400 m-1">Login!</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
}

export default Register;
