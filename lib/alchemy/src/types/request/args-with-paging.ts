export type ArgsWithPaging<T extends object> = T & {
  pageKey?: string
  pageSize?: number // max 100
}
