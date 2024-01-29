
export interface Account {
  id: number
  accountNumber: number,
  clientNumber: number,
  currency: string
  accountType: string,
  accountStatus: string
}

export interface AccountRequest {
  first: number,
  last: number,
  sortField: string | string []
  sortOrder: number;
  filter?: {
    clientNumber: string
  }
}
