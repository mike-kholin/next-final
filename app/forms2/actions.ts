"use server";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  description: z.string(),
});

export type UserSchema = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

export async function User2(
  prevState: UserSchema | undefined,
  formData: FormData
) {
  const validation = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validation.success) {
    const state: UserSchema = {
      errors: validation.error.flatten().fieldErrors,
      message: "something is wrong",
    };
    return state;
  }

  console.log(validation.data.name, validation.data.description);

  return { message: "saved succefully" };
}
