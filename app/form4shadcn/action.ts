import { z } from "zod";

const userSchema = z.object({
  userName: z.string().min(1, { message: "name is too shoort" }),
  password: z.string(),
});

interface State {
  errors?: {
    name?: string[];
    password?: string[];
  };
  message?: string | null;
}

export async function Shadcn(prevState: State | undefined, formData: FormData) {
  const validation = userSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    const state: State = {
      errors: validation.error.flatten().fieldErrors,
      message: "something went wrong",
    };
    return state;
  }

  return {
    message: "i was here",
  };
}
