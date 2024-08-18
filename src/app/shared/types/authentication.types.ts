export type LoginPayload = { identifier: string; password: string }

export type RegisterPayload = {
  email: string
  password: string
  username: string
  cpfCnpj: string
  terms: boolean
}

export type ResetPasswordPayload = {
  token: string
  newPassword: string
}
export type Authentication = {
  access_token: string
  user: UserAuth
}

export type UserAuth = {
  id: string
  email: string
  username: string
  cpfCnpj: string | null
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
  role: number
  personId: string | null
}
