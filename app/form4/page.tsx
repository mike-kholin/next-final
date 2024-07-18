"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User3 } from "../form3/action";

const schema = z.object({
  name: z.string(),
  description: z.string(),
});

type schemaType = z.infer<typeof schema>;

const page = () => {
  const { register, handleSubmit, setError, getValues } = useForm<schemaType>({
    resolver: zodResolver(schema),
  });

  const onClick = async (data: schemaType) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const results = await User3(undefined, formData);

      if (results.errors) {
        Object.entries(results.errors).forEach(([key, value]) => {
          setError(key as keyof schemaType, {
            type: "manual",
            message: value?.[0],
          });
        });
      } else {
        return {
          message: "success",
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onClick)}>
      <input {...register("name")} />
      <input {...register("description")} />
      <button type="submit">submit</button>
    </form>
  );
};

export default page;
