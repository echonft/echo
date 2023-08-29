import { LinkProvider } from '@echo/ui'

export const linkProvider: LinkProvider = {
  offerLink: (offerId: string) => `/offer/${offerId}`,
  userLink: (userId: string) => `/user/${userId}`
}
