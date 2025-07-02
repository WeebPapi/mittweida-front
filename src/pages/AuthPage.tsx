import React from "react"
import { signIn } from "../api/auth.actions"

const AuthPage = () => {
  const handleLogin = async () => {
    await signIn({ email: "djt@whitehouse.gov", password: "ChinaIsWrong" })
  }
  return (
    <div>
      {" "}
      <button type="button" onClick={handleLogin}>
        Click me
      </button>
    </div>
  )
}

export default AuthPage
