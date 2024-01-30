// noinspection JSUnusedGlobalSymbols

import { LISTING_ROLE_CREATOR, LISTING_ROLE_TARGET } from '@echo/model/constants/listing-role'
import { LISTING_STATE_EXPIRED } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { cancelListing } from '@echo/storybook/mocks/cancel-listing'
import { createOffer } from '@echo/storybook/mocks/create-offer'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { ListingDetails as Component } from '@echo/ui/components/listing/details/listing-details'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, filter, ifElse, pathEq, pipe, when } from 'ramda'
import { type FunctionComponent } from 'react'

type Role = 'Creator' | 'Target' | 'None'
type ComponentType = FunctionComponent<
  Record<'readOnly', boolean> &
    Record<'expired', boolean> &
    Record<'role', Role> &
    Record<'targetHasNfts', boolean> &
    Record<'withOffers', boolean>
>

const metadata: Meta<ComponentType> = {
  title: 'Listing/Details',
  args: {
    readOnly: false,
    expired: false,
    role: 'None',
    targetHasNfts: true,
    withOffers: false
  },
  argTypes: {
    readOnly: {
      defaultValue: false,
      control: 'boolean'
    },
    expired: {
      defaultValue: false,
      control: 'boolean'
    },
    role: {
      defaultValue: 'None',
      options: ['Creator', 'Target', 'None'],
      control: { type: 'radio' }
    },
    targetHasNfts: {
      defaultValue: true,
      control: 'boolean'
    },
    withOffers: {
      defaultValue: false,
      control: 'boolean'
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ readOnly, expired, role, withOffers, targetHasNfts }) => {
    function getTargetNfts(): Nft[] {
      return ifElse(
        always(targetHasNfts),
        pipe<[], Nft[], Nft[]>(getAllNftMocks, filter(pathEq('Rc8pLQXxgyQGIRL0fr13', ['collection', 'id']))),
        always([])
      )()
    }
    function getOffers(): Offer[] {
      return ifElse(always(withOffers), getAllOfferMocks, always([]))()
    }
    function setRole(role: Role) {
      return function (listing: Listing): ListingWithRole {
        if (role === 'Creator') {
          return assoc('role', LISTING_ROLE_CREATOR, listing)
        }
        if (role === 'Target') {
          return assoc('role', LISTING_ROLE_TARGET, listing)
        }
        return assoc('role', undefined, listing)
      }
    }
    const renderedListing = pipe<[], Listing, Listing, Listing, ListingWithRole>(
      getListingMock,
      ifElse<[Listing], Listing, Listing>(
        always(expired),
        pipe<[Listing], Listing, Listing, Listing>(
          assoc('expiresAt', expiredDate()),
          assoc('state', LISTING_STATE_EXPIRED),
          assoc('readOnly', true)
        ),
        assoc('expiresAt', notExpiredDate())
      ),
      when<Listing, Listing>(always(readOnly), assoc('readOnly', true)),
      setRole(role)
    )()
    return (
      <Component
        listing={renderedListing}
        user={role === 'Creator' ? getAuthUserMockByUsername('johnnycagewins') : getAuthUserMockByUsername('crewnft_')}
        fetcher={{ cancelListing, createOffer: createOffer('LyCfl6Eg7JKuD7XJ6IPi') }}
        userTargetNfts={getTargetNfts()}
        offers={getOffers()}
      />
    )
  }
}
