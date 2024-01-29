export interface Customer {
  id: number
  first_name: string
  last_name: string
  email: string
  status: boolean
}

export interface Action {
  label: string
  icon: string
  id?: string
  click?: () => void
}
