export type Register = {
  email: string
  username: string
  cpfCnpj: string
  password: string
  createdAt: string | Date
  updatedAt: string | Date
  personId: string | null
  terms: boolean
}

export type UserTable = {
  email: string
  username: string
  cpfCnpj: string
  createdAt: Date
  terms: boolean
  action: {
    view: string
    delete: string
  }
}
