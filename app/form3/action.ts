"use server";

import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  description: z.string(),
});

type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

export async function User3(prevState: State | undefined, formData: FormData) {
  const validation = userSchema.safeParse({
    name: formData.get("name"),
    decription: formData.get("description"),
  });

  if (!validation.success) {
    const miniState: State = {
      errors: validation.error.flatten().fieldErrors,
      message: "i am the inner error",
    };
    return miniState;
  }

  return { message: "i am the outer  error " };
}
