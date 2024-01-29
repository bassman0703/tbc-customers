export const pageOptions = (page: number, pageSize: number) => ({
  '_page': page,
  '_per_page': pageSize
})


export interface PaginationResponse<T> {
  data: T[]
  first?: number,
  prev?: number,
  next?: number,
  last?: number,
  pages?: number,
  items?: number,
}
