// noinspection JSUnusedGlobalSymbols

import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { LISTING_STATE_CANCELLED, LISTING_STATE_EXPIRED } from '@echo/model/constants/listing-states'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { ListingDetails as Component } from '@echo/ui/components/listing/details/listing-details'
import { setListingRoleForUser } from '@echo/ui/helpers/listing/set-listing-role-for-user'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { always, assoc, ifElse, mergeLeft, pipe, when } from 'ramda'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<
  Record<'readOnly', boolean> &
    Record<'expired', boolean> &
    Record<'isCreator', boolean> &
    Record<'targetHasNfts', boolean> &
    Record<'ownerHasOffers', boolean>
>
const DEFAULT_EXPIRED = false
const DEFAULT_READ_ONLY = false
const DEFAULT_IS_CREATOR = false
const DEFAULT_HAS_NFTS = true
const DEFAULT_HAS_OFFERS = false
const EXPIRED_DATE = dayjs().subtract(2, 'd').unix()
const NOT_EXPIRED_DATE = dayjs().add(2, 'd').unix()
const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
const creator = getAuthUserMockByUsername(listing.creator.username)
const target = getAuthUserMockByUsername('crewnft_')
const targetNfts = [
  getNftMockById('XiDa6k2P7gxXCKSxn2wq'),
  assoc('id', '1')(getNftMockById('XiDa6k2P7gxXCKSxn2wq')),
  assoc('id', '2')(getNftMockById('XiDa6k2P7gxXCKSxn2wq'))
]
const ownerOffers = [getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'), getOfferMockById('ASkFpKoHEHVH0gd69t1G')]
function cancelListing(_args: CancelListingArgs) {
  return delayPromise(
    Promise.resolve({
      listing: mergeLeft({ state: LISTING_STATE_CANCELLED, readOnly: true }, listing)
    }),
    800
  )
}

function createOffer(_args: CreateOfferRequest) {
  return delayPromise(
    Promise.resolve({
      offer: getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    }),
    800
  )
}

const metadata: Meta<ComponentType> = {
  title: 'Listing/Details',
  args: {
    readOnly: DEFAULT_READ_ONLY,
    expired: DEFAULT_EXPIRED,
    isCreator: DEFAULT_IS_CREATOR,
    targetHasNfts: DEFAULT_HAS_NFTS,
    ownerHasOffers: DEFAULT_HAS_OFFERS
  },
  argTypes: {
    readOnly: {
      defaultValue: DEFAULT_READ_ONLY,
      control: 'boolean'
    },
    expired: {
      defaultValue: DEFAULT_EXPIRED,
      control: 'boolean'
    },
    isCreator: {
      defaultValue: DEFAULT_IS_CREATOR,
      control: 'boolean'
    },
    targetHasNfts: {
      defaultValue: DEFAULT_HAS_NFTS,
      control: 'boolean'
    },
    ownerHasOffers: {
      defaultValue: DEFAULT_HAS_OFFERS,
      control: 'boolean'
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Default: Story = {
  render: ({ readOnly, expired, isCreator, ownerHasOffers, targetHasNfts }) => {
    const renderedListing = pipe(
      ifElse(
        always(expired),
        mergeLeft({ expiresAt: EXPIRED_DATE, state: LISTING_STATE_EXPIRED, readOnly: true }),
        assoc('expiresAt', NOT_EXPIRED_DATE)
      ),
      when(always(readOnly), assoc('readOnly', true)),
      ifElse(always(isCreator), setListingRoleForUser(creator), setListingRoleForUser(target))
    )(listing) as ListingWithRole
    return (
      <Component
        listing={renderedListing}
        user={isCreator ? creator : target}
        fetcher={{ cancelListing, createOffer }}
        userTargetNfts={targetHasNfts ? targetNfts : undefined}
        offers={ownerHasOffers ? ownerOffers : undefined}
      />
    )
  }
}
