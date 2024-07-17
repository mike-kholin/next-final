"use server";

import { z } from "zod";

// import { z } from "zod";

// import { z } from "zod";

// const NameFormSchema = z.object({
//   name: z
//     .string()
//     .min(2, { message: "You must enter at least two characters" }),
// });

// export type State = {
//   errors?: {
//     name?: string[];
//   };
//   message?: string | null;
// };

// export async function saveWebsite(
//   prevState: State | undefined,
//   formData: FormData
// ) {
//   // Validate Inputs
//   const validatedFields = NameFormSchema.safeParse({
//     name: formData.get("name"),
//   });

//   // Handle Validation Errors
//   if (!validatedFields.success) {
//     const state: State = {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Oops, I think there's a mistake with your inputs.",
//     };

//     return state;
//   }

//   // Do your save here...
// }
// const nameSchema = z.object({
//   name: z.string(),
// });

// export type State = {
//   errors?: {
//     name?: string[];
//   };
//   message?: string | null;
// };

// export async function User(prevState: State | undefined, formData: FormData) {
//   const validation = nameSchema.safeParse({
//     name: formData.get("name"),
//   });

//   console.log(validation.data?.name);

//   if (!validation.success) {
//     const state: State = {
//       errors: validation.error.flatten().fieldErrors,
//       message: "Oops, I think there's a mistake with your inputs.",
//     };
//     return state;
//   }

//   return {
//     message: "message saved",
//   };
// }

const schema = z.object({
  name: z.string(),
});

type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function User(prevState: State | undefined, formData: FormData) {
  const validation = schema.safeParse({
    name: formData.get("name"),
  });

  if (!validation.success) {
    const state: State = {
      errors: validation.error.flatten().fieldErrors,
      message: "something went wrong",
    };
    return state;
  }

  return {
    message: "something is here",
  };
}
