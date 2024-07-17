// "use client";

// import React from "react";
// import { useFormState } from "react-dom";
// import { saveWebsite } from "./action";

// export default function NameForm() {
//   const initialState = { message: "", errors: {} };
//   const [state, formAction] = useFormState(saveWebsite, initialState);

//   return (
//     <form action={formAction}>
//       {state && state.message && <div>{state.message}</div>}
//       <div>
//         <label htmlFor="name">Enter your name</label>
//         <div>
//           <input
//             name="name"
//             id="name"
//             type="text"
//             required
//             placeholder="Ex. Brandon Sanderson"
//             onBlur={async (e) => {
//               const formData = new FormData();
//               formData.append("name", e.target.value);
//               await formAction(formData);
//             }}
//           />
//         </div>
//       </div>
//     </form>
//   );
// }
"use client";
import { revalidatePath } from "next/cache";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { User } from "./action";

const page = () => {
  const initialState = { message: "", errors: {} };
  const [state, formAction] = useFormState(User, initialState);
  return (
    <div>
      <form action={formAction}>
        <input
          className="border-2 rounded-md ml-10 mt-10 text-black"
          type="text"
          name="name"
        />
        <button
          className="text-black border-2"
          type="submit"
          onClick={() => {
            revalidatePath("/form");
          }}
        >
          send
        </button>
      </form>
      {state.message && <span className="text-black">{state.message}</span>}
    </div>
  );
};

export default page;
