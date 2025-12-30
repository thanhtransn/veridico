export class PaginatedDto<T> {
  total: number

  skip: number

  limit: number

  data: T[]
}
