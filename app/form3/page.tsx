"use cient";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User3 } from "./action";

const userSchema = z.object({
  name: z.string(),
  description: z.string(),
});

type formSchemaMain = z.infer<typeof userSchema>;

const page = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<formSchemaMain>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = async (data: formSchemaMain) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const results = await User3(undefined, formData);

      if (results.errors) {
        Object.entries(results.errors).forEach(([key, value]) => {
          setError(key as keyof formSchemaMain, {
            type: "manual",
            message: value?.[0],
          });
        });
      } else {
        // Handle success
        console.log(results.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onClick={handleSubmit(onSubmit)}>
      <input {...register("name")} type="text" />
      <input {...register("description")} type="text" />
      <button type="submit">submit</button>
    </form>
  );
};

export default page;
