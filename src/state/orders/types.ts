export interface Order {
  id: number
  customer: {
    name: string
  }
  currentsStatus: {
    id: number
    name: string
  }
}
