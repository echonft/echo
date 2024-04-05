export type ResultWithPaging<Result> = {
  [Key in string]: Result[]
} & { total: number; limit: number; page: number }
