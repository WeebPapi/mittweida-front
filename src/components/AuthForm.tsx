import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SignInData, SignUpData } from "@/api/interfaces"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const AuthForm = () => {
  const [type, setType] = useState("sign-in")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const formSchema = type === "sign-in" ? SignInData : SignUpData

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

  function onSubmit(values: z.infer<typeof formSchema>) {}
  const formFields =
    type === "sign-in"
      ? [
          {
            name: "email",
            label: "Email",
            placeholder: "Your email here",
            type: "text",
            value: email,
            changeHandler: setEmail,
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Your password here",
            type: "password",
            value: password,
            changeHandler: setPassword,
          },
        ]
      : [
          {
            name: "email",
            label: "Email",
            placeholder: "Your email here",
            type: "text",
            value: email,
            changeHandler: setEmail,
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Your password here",
            type: "password",
            value: password,
            changeHandler: setPassword,
          },
          {
            name: "firstName",
            label: "First name",
            placeholder: "Your first name here",
            type: "text",
            value: firstName,
            changeHandler: setFirstName,
          },
          {
            name: "lastName",
            label: "Last name",
            placeholder: "Your last name here",
            type: "text",
            value: lastName,
            changeHandler: setLastName,
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
                    <Input placeholder={field.placeholder} {...innerField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
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
