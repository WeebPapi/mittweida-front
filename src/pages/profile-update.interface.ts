export interface ProfileUpdate {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  profilePicture?: string
}

export type profileObjKeys =
  | "firstName"
  | "lastName"
  | "profilePicture"
  | "email"
  | "password"
