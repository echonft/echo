export function getAuthorizationHeader<T extends Record<'token', string>>(args: T) {
  return { Authorization: `Bearer ${args.token}` }
}
