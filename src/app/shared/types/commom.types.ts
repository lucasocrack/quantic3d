// noinspection JSUnusedGlobalSymbols

export type SidebarItems = {
  title: string
  children?: SidebarChildren[]
}

export type SidebarChildren = {
  title: string
  icon: string
  badge?: string
  route?: string
  subChildren?: SidebarSubChildren[]
}

export type SidebarSubChildren = {
  title: string
  route: string
  badge?: string
}

export type DetailedError = {
  message: string
  exception?: {
    message: string
  }
  errors?: Array<{
    message: string
  }>
}

export type ErrorResponse = {
  error: DetailedError | string | undefined
}
