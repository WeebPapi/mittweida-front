import * as z from "zod"

export const SignInData = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email Format" })
    .nonempty()
    .trim(),
  password: z.string().min(8).trim(),
})

export const SignUpData = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email Format" })
    .nonempty()
    .trim(),
  password: z.string().min(8).trim(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
})

export type SignInDataType = z.infer<typeof SignInData>
export type SignUpDataType = z.infer<typeof SignUpData>
