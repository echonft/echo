export interface NextFetchRequestConfig<Query, Body> {
  bearerToken?: string
  cookies?: string
  data?: Body
  disableCache?: boolean
  params?: Query
  revalidate?: number
  tags?: string[]
}
