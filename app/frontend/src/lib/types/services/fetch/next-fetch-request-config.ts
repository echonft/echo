export interface NextFetchRequestConfig<Query, Body> {
  bearerToken?: string
  cookie?: string
  data?: Body
  disableCache?: boolean
  params?: Query
  revalidate?: number
  tags?: string[]
}
