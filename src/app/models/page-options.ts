export const pageOptions = (page: number, pageSize: number, order: 'ASC' | 'DESC', orderBy: string) => ({
  '_page': page,
  '_per_page': pageSize,
  '_sort': order === 'DESC'? '-' : '' + orderBy,
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
