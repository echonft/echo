import { useGetOffer } from './hooks/use-get-offer'
import { useGetUserOffers } from './hooks/use-get-user-offers'
import { useUpdateOffer } from './hooks/use-update-offer'
import { ApiProvider } from '@echo/ui'

export const apiProvider: ApiProvider = {
  hooks: {
    useGetUserOffers,
    useGetOffer,
    useUpdateOffer
  }
}
