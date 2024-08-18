export type User = {
  id: string
  email: string
  username: string
  cpfCnpj: string
  password: string
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date | null
  role: Role
  personId: string | null
}

export enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  FINANCIAL = 'FINANCIAL',
  SALESPERSON = 'SALESPERSON',
  TECHNICIAN = 'TECHNICIAN',
  SUPERVISOR = 'SUPERVISOR',
  SUPERADMIN = 'SUPERADMIN',
}

export type UserTable = {
  email: string
  username: string
  role: Role
  cpfCnpj: string
  createdAt: Date
  action: {
    view: string
    delete: string
  }
}
