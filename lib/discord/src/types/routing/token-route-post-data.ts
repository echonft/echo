export interface TokenRoutePostData extends Record<string, string> {
  client_id: string
  client_secret: string
  grant_type: string
  code: string
  redirect_uri: string
  scope: string
}
