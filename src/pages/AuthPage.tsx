import React from "react"
import { signIn } from "../api/auth.actions"
import AuthForm from "../components/AuthForm"

const AuthPage = () => {
  const handleLogin = async () => {
    await signIn({ email: "djt@whitehouse.gov", password: "ChinaIsWrong" })
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      {" "}
      <AuthForm />
    </div>
  )
}

export default AuthPage
