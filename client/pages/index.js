import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { login, storeUser } from "../service/auth.service";
import Notiflix from "notiflix";
import { useRouter } from "next/router";
function Home() {
  const router = useRouter();
  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().min(6),
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
    Notiflix.Loading.pulse("Loading...");

    try {
      const response = await login(data);
      if (response.status === 200) {
        console.log(response.data);
        storeUser(response.data);
        router.push("/dashboard");
      }
    } catch (error) {
      Notiflix.Notify.failure(error.response.data);
    } finally {
      Notiflix.Loading.remove();
    }
  };
  useEffect(() => {
    if (localStorage.token) {
      router.push("/dashboard");
    }
  });
  return (
    <div>
      <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 mt-16 ">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h3>
              <p className="mt-2 text-center text-sm text-gray-600"></p>
            </div>
            <form
              className="mt-12 space-y-6 px-5 py-5 rounded-md shadow-md"
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
                    className="mt-1 px-3 py-2 placeholder:italic bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-fuchsia-400 focus:border-sky-600 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
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
                    Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    className="mt-1 px-3 py-2 placeholder:italic bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-fuchsia-400  focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="enter your password"
                    {...register("password")}
                  />
                </label>
                <div className="mt-2 mb-2 text-danger">
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
    
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div> */}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
                  </span>
                  Sign in
                </button>
              </div>
              <div className="mt-4 text-sm text-center cursor-pointer">
                Don't have an Account?
                <Link href="/register">
                  <span className="text-indigo-400 m-1">Register Now!</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
}
export default Home;
