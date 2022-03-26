import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControlLabel, Checkbox, Box } from "@mui/material";
import { useRouter } from "next/router";
import { getById, updateById, deleteById } from "../../service/task.service";
import Notiflix from "notiflix";

function idpage() {
  const [isData, setData] = useState(null);
  const [isCheck, setCheck] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const preloadedValues = {
    taskname: isData ? isData.taskname : "",
  };
  const schema = yup.object({
    taskname: yup.string().required("Please Enter Your Task"),
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: preloadedValues,
  });
  const getTaskById = async () => {
    Notiflix.Loading.pulse("Loading...");
    try {
      const response = await getById(id);
      const resdata = response.data;
      if (response.status === 200) {
        console.log(resdata.data);
        setData(resdata.data);
      }
    } catch (err) {
      Notiflix.Notify.failure(err.response.data);
    } finally {
      Notiflix.Loading.remove();
    }
  };

  const update = async (data) => {
    Notiflix.Loading.pulse("Loading...");
    try {
      data.completed = isCheck;
      const response = await updateById(id, data);
      if (response.status === 200) {
        Notiflix.Notify.success("updated successfully");
        router.push("/dashboard");
      }
    } catch (err) {
      Notiflix.Notify.failure(err.response.data);
    } finally {
      Notiflix.Loading.remove();
    }
  };

  const handleChange = (event) => {
    setCheck(event.target.checked);
    console.log(isCheck);
  };
  useEffect(() => {
    if (id) {
      getTaskById(id);
    }
  }, [id, reset]);
  return (
    <div>
      <div className="mt-24">
        <div className="flex justify-center">
          <div className="max-w-md w-full rounded-md shadow-md py-4 px-4 sm:mx-4">
            <p className="font-bold">
              UserId: <span className="m-1 font-bold">{id}</span>
            </p>

            <form onSubmit={handleSubmit(update)} method="POST">
              <label className="block">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Task Name
                </span>
                <input
                  type="text"
                  className="mt-1 px-3 py-2 placeholder:italic bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-fuchsia-400 focus:border-sky-600 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Task Name"
                  {...register("taskname")}
                />
              </label>
              <div className="mt-2 mb-2 text-danger">
                {errors.taskname && <p>{errors.taskname.message}</p>}
              </div>
              <div className="mt-3">
                <FormControlLabel
                  label="Completed"
                  control={
                    <Checkbox
                      checked={isCheck}
                      color="primary"
                      onChange={handleChange}
                    />
                  }
                />
              </div>
              <button
                type="submit"
                className="group mt-4 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Update Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default idpage;
