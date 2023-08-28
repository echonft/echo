import { useGetUserOffers } from './hooks/use-get-user-offers'
import { ApiProvider } from '@echo/ui'

// TODO Implement other hooks
export const apiProvider: ApiProvider = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  hooks: {
    useGetUserOffers
  }
}
