"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User2 } from "./actions";

const serverSchema = z.object({
  name: z.string(),
  description: z.string(),
});

// Client-side schema
const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof clientSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await User2(undefined, formData);
      if (result.errors) {
        Object.entries(result.errors).forEach(([key, value]) => {
          setError(key as keyof FormData, {
            type: "manual",
            message: value?.[0],
          });
        });
      } else {
        // Handle success
        console.log(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border-2 rounded-md ml-10 mt-10 text-black"
          type="text"
          {...register("name")}
          placeholder="Name"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <input
          className="border-2 rounded-md ml-10 mt-10 text-black"
          type="text"
          {...register("description")}
          placeholder="Description"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}

        <button className="text-black border-2" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Page;
