import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SignInData, SignUpData, type SignUpDataType } from "@/api/interfaces"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn, signUp } from "@/api/auth.actions"
import { useNavigate } from "react-router"

const AuthForm = () => {
  const [type, setType] = useState("sign-in")
  const formSchema = type === "sign-in" ? SignInData : SignUpData
  const navigate = useNavigate()
  const [credentialsWrong, setCredentialsWrong] = useState(false)
  const [emailInUse, setEmailInUse] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === "sign-in"
        ? {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }
        : { email: "", password: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setCredentialsWrong(false)
    // Handling the sign in
    if (type === "sign-in") {
      const signInRequest = await signIn(values)
      if (signInRequest.success === true) {
        navigate("/")
      } else {
        if (signInRequest.error.status === 401) setCredentialsWrong(true)
      }

      // Handling the sign up
    } else if (type === "sign-up") {
      setEmailInUse(false)
      const signUpRequest = await signUp(values as SignUpDataType)
      if (signUpRequest.success === true) {
        navigate("/")
      } else {
        if (signUpRequest.error.status === 409) {
          setEmailInUse(true)
        }
        console.error(signUpRequest.error)
      }
    }
  }
  const formFields =
    type === "sign-in"
      ? [
          {
            name: "email",
            label: "Email",
            placeholder: "Your email here",
            type: "text",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Your password here",
            type: "password",
          },
        ]
      : [
          {
            name: "email",
            label: "Email",
            placeholder: "Your email here",
            type: "text",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Your password here",
            type: "password",
          },
          {
            name: "firstName",
            label: "First name",
            placeholder: "Your first name here",
            type: "text",
          },
          {
            name: "lastName",
            label: "Last name",
            placeholder: "Your last name here",
            type: "text",
          },
        ]
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        {formFields.map((field) => (
          <div key={field.label}>
            <FormField
              control={form.control}
              name={field.name as "email" | "password"}
              render={({ field: innerField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={field.placeholder}
                      type={field.type}
                      {...innerField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        {credentialsWrong ? (
          <p className="text-xs text-red-500">
            Email or Password is incorrect, try again
          </p>
        ) : null}
        {emailInUse ? (
          <p className="text-xs text-red-500">
            This email is already in use, try again or{" "}
            <span
              onClick={() => {
                setType("sign-in")
                setEmailInUse(false)
              }}
              className="text-blue-500 font-semibold cursor-pointer"
            >
              Sign in
            </span>
          </p>
        ) : null}
        <div className="w-full flex gap-8">
          <Button type="submit">Submit</Button>
          <Button
            type="button"
            onClick={() => {
              if (type === "sign-in") setType("sign-up")
              else setType("sign-in")
            }}
          >
            Switch to {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AuthForm
