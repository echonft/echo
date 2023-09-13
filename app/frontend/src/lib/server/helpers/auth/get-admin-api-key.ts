import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export const getAdminApiKey = (): string => {
  const adminApiKey = process.env.ADMIN_API_KEY
  if (isNilOrEmpty(adminApiKey)) {
    throw Error(`.env should contain ADMIN_API_KEY`)
  }
  return adminApiKey
}
