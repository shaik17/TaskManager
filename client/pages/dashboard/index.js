import React, { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getTasks, createTask, deleteById } from "../../service/task.service";
import { logoutUser } from "../../service/auth.service";
import Notiflix from "notiflix";
import Link from "next/link";
import router from "next/router";

function Dashboard() {
  const [isTask, setTask] = useState(null);
  const schema = yup.object({
    taskname: yup.string().required("Please Enter Your Task"),
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
  const getTask = async () => {
    Notiflix.Loading.pulse("Loading...");
    try {
      const response = await getTasks();
      const resdata = response.data;
      if (response.status === 200) {
        setTask(resdata.response);
      }
    } catch (err) {
      Notiflix.Notify.failure(err.response.data);
    } finally {
      Notiflix.Loading.remove();
    }
  };
  const logout = async () => {
    Notiflix.Loading.pulse("Logout...");
    logoutUser();
    router.push("/");

    Notiflix.Loading.remove();
  };
  const submit = async (data) => {
    Notiflix.Loading.pulse("Loading...");
    try {
      const response = await createTask(data);
      if (response.status === 201) {
        Notiflix.Notify.success("Task created");
        router.reload();
      }
    } catch (err) {
      Notiflix.Notify.failure(err.response.data);
    } finally {
      Notiflix.Loading.remove();
    }
  };
  const Delete = async (id) => {
    Notiflix.Loading.pulse("Loading...");
    try {
      const response = await deleteById(id);
      if (response.status === 200) {
        Notiflix.Notify.success("deleted successfully");
        router.reload();
      }
    } catch (err) {
      Notiflix.Notify.failure(err.response.data);
    } finally {
      Notiflix.Loading.remove();
    }
  };
  useEffect(() => {
    if (!localStorage.token) {
      router.push("/");
    }

    getTask();
  }, []);
  return (
    <div>
      <div className="">
        <div className="flex justify-end sm:mx-4 mx-2">
          <div className="sm:mt-4 mt-4">
            <a
              onClick={logout}
              className="sm:my-4 text-bold hover:cursor-pointer no-underline  rounded-full text-black px-4 py-1  font-bold "
            >
              <i className="bi bi-box-arrow-in-right m-1"></i> Logout
            </a>
          </div>
        </div>

        <div className="mt-24">
          <div className="flex  justify-center">
            <div className="mb-3 w-full max-w-md sm:mx-4 py-4 rounded-md px-4 shadow-md">
              <form onSubmit={handleSubmit(submit)} method="post">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                    TaskName
                  </span>
                  <input
                    type="text"
                    name="taskname"
                    className="mt-1 px-3 py-2 placeholder:italic bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-fuchsia-400 focus:border-sky-600 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Create Task"
                    {...register("taskname")}
                  />
                </label>

                <div className="mt-2 mb-2 text-danger">
                  {errors.taskname && <p>{errors.taskname.message}</p>}
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {/* <h5 className="flex justify-center">Task List</h5> */}
          <div className="flex justify-center mt-12 sm:mx-4">
            <div className="w-full max-w-md">
              {isTask
                ? isTask.map((res, i) => {
                    return (
                      <>
                        <p className="rounded-md justify-center my-2  relative flex items-center shadow-md h-12">
                          <span className="absolute  left-0 m-3 font-bold">
                            {i + 1}
                          </span>
                          <span
                            className={`${
                              res.completed
                                ? "font-bold line-through text-xl text-green-600"
                                : "font-bold text-xl"
                            }`}
                          >
                            {res.taskname}
                          </span>
                          <span className="absolute  right-0 cursor-pointer">
                            <Link href={`/dashboard/${res.taskId}`}>
                              <i class="bi bi-pencil-fill m-2 cursor-pointer"></i>
                            </Link>
                            <a onClick={() => Delete(res.taskId)}>
                              <i class="bi bi-trash-fill m-3 cursor-grab"></i>
                            </a>
                          </span>
                        </p>
                      </>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
