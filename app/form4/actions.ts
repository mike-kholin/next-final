"use server";

import { z } from "zod";

const schema = z.object({
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

export async function User4(prevState: State | undefined, formData: FormData) {
  const validation = schema.safeParse({
    name: formData.get("name"),
    descirption: formData.get("description"),
  });

  if (!validation.success) {
    const state: State = {
      errors: validation.error.flatten().fieldErrors,
      message: "something is wrong",
    };

    return state;
  }

  return {
    message: "This is correct",
  };
}
