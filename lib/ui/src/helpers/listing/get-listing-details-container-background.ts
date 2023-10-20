import { type Listing } from '@echo/model/types/listing'

export const getListingDetailsContainerBackground = (listing: Listing) => {
  const { expired, state } = listing
  switch (state) {
    case 'OPEN':
    case 'OFFERS_PENDING':
    case 'PARTIALLY_FULFILLED':
      return expired ? 'bg-offer-red-gradient' : 'bg-offer-yellow-gradient'
    case 'FULFILLED':
      return 'bg-offer-green-gradient'
    case 'CANCELLED':
      return 'bg-offer-red-gradient'
  }
}
