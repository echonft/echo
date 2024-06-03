export interface BaseResponse<T> {
  code: number
  msg: string | null
  data: T
}
