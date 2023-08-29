import { LinkProvider } from '@echo/ui'

export const linkProvider: LinkProvider = {
  offerLink: (_offerId: string) => '#',
  userLink: (_userId: string) => '#'
}
