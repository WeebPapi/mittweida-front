export type UserRole = "USER" | "ADMIN" | "BUSINESS_OWNER"

export type User = {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  profilePicture: string | null
  role: UserRole
  refresh_token: string | null
  createdAt: Date
  updatedAt: Date
  groups?: GroupMember[]
  photos?: Photo[]
  polls?: Poll[]
  pollVotes?: PollVote[]
}

export type Group = {
  id: string
  name: string
  code: string
  createdAt: Date
  updatedAt: Date
  members?: GroupMember[]
  photos?: Photo[]
  polls?: Poll[]
}

export type GroupMember = {
  id: string
  userId: string
  groupId: string
  isAdmin: boolean
  joinedAt: Date
  user?: User
  group?: Group
}

export type Photo = {
  id: string
  url: string
  caption: string | null
  location: string | null
  userId: string
  groupId: string | null
  createdAt: Date
  user?: User
  group?: Group | null
}

export type Poll = {
  id: string
  question: string
  createdAt: Date
  expiresAt: Date
  createdBy: string
  groupId: string
  options?: PollOption[]
  user?: User
  group?: Group
  votes?: PollVote[]
}

export type PollOption = {
  id: string
  text: string
  pollId: string
  activityId: string
  activity?: Activity
  poll?: Poll
  votes?: PollVote[]
}

export type PollVote = {
  id: string
  userId: string
  pollId: string
  pollOptionId: string
  createdAt: Date
  user?: User
  poll?: Poll
  option?: PollOption
}

export type Activity = {
  id: string
  name: string
  description: string
  address: string
  latitude: number
  longitude: number
  videoUrl: string | null
  imageUrl: string | null
  category: string
  openHours: OpenHours | null
  createdAt: Date
  updatedAt: Date
  PollOption?: PollOption[]
}

export type OpenHours = {
  [day: string]: {
    open: string
    close: string
  }
}
