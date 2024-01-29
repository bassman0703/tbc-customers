export interface User {
  id: number,
  clientNumber: string,
  firsName: string,
  lastName: string,
  gender: string,
  personalNumber: number,
  phoneNumber: number,
  legalCountry: string,
  legalCity: string,
  legalAddress: string,
  actualCountry: string,
  actualCity: string,
  actualAddress: string
  img: string
}

export interface UserRequest {
  first: number,
  last: number,
  sortField: string | string []
  sortOrder: number;
  filter?: {
    clientNumber: string
  }
}
