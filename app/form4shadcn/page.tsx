"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Shadcn } from "./action";

const userSchema = z.object({
  userName: z.string().min(1, { message: "name is too shoort" }),
  password: z.string(),
});

type userSchemaType = z.infer<typeof userSchema>;

const action = () => {
  const form = useForm<userSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const results = await Shadcn(undefined, formData);

      if (results.errors) {
        Object.entries(results.errors).forEach(([key, value]) => {
          form.setError(key as keyof userSchemaType, {
            type: "manual",
            message: value?.[0],
          });
        });
        return {
          message: "success",
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form className="w-[400px] ml-10 mt-20 mr-20 space-y-2">
        <>
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>user name:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...form.register("userName")}
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...form.register("password")}
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </>
        <Button type="submit">submit</Button>
      </form>
    </Form>
  );
};

export default action;
