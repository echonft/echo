import { isNilOrEmpty } from '@echo/utils'

export const getAdminApiKey = (): string => {
  const adminApiKey = process.env.ADMIN_API_KEY
  if (isNilOrEmpty(adminApiKey)) {
    throw Error(`.env should contain ADMIN_API_KEY`)
  }
  return adminApiKey
}
