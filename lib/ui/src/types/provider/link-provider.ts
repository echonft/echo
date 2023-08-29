import { Url } from 'next/dist/shared/lib/router/router'

export interface LinkProvider {
  offerLink: (offerId: string) => Url
  userLink: (userId: string) => Url
}
