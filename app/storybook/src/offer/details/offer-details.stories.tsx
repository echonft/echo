import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { OFFER_STATES } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetails as Component } from '@echo/ui/components/offer/details/offer-details'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { always, assoc, ifElse, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<
  Record<'state', OfferState> & Record<'expired', boolean> & Record<'isCreator', boolean>
>
const DEFAULT_STATE: OfferState = 'OPEN'
const DEFAULT_IS_CREATOR = true
const DEFAULT_EXPIRED = false
const EXPIRED_DATE = dayjs().subtract(2, 'd').unix()
const NOT_EXPIRED_DATE = dayjs().add(2, 'd').unix()
const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function acceptOfferFetcher(_offerId: string, _signature: HexString | undefined, _token: string | undefined) {
  return delayPromise(Promise.resolve({ offer: assoc('state', 'ACCEPTED', offer) }), 800)
}
function rejectOfferFetcher(_offerId: string, _token: string | undefined) {
  return delayPromise(Promise.resolve({ offer: assoc('state', 'REJECTED', offer) }), 800)
}
function cancelOfferFetcher(_offerId: string, _token: string | undefined) {
  return delayPromise(Promise.resolve({ offer: assoc('state', 'REJECTED', offer) }), 800)
}
function completeOfferFetcher(_offerId: string, _transactionId: HexString | undefined, _token: string | undefined) {
  return delayPromise(Promise.resolve({ offer: assoc('state', 'CANCELLED', offer) }), 800)
}
function getOfferSignatureFetcher(_offerId: string, _token: string | undefined) {
  return delayPromise(
    Promise.resolve({
      signature: '0xsignature'
    } as OfferSignatureResponse),
    800
  )
}

const metadata: Meta<ComponentType> = {
  title: 'Offer/Details',
  argTypes: {
    state: {
      defaultValue: DEFAULT_STATE,
      options: OFFER_STATES,
      control: { type: 'radio' }
    },
    expired: {
      defaultValue: DEFAULT_EXPIRED,
      control: 'boolean'
    },
    isCreator: {
      defaultValue: DEFAULT_IS_CREATOR,
      control: 'boolean'
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Default: Story = {
  render: ({ state, expired, isCreator }) => {
    const renderedOffer = pipe(
      assoc('state', state),
      assoc('expired', expired),
      ifElse(always(expired), assoc('expiresAt', EXPIRED_DATE), assoc('expiresAt', NOT_EXPIRED_DATE))
    )(offer) as Offer
    return (
      <Component
        offer={renderedOffer}
        isCreator={isCreator}
        token={'token'}
        getOfferSignatureFetcher={getOfferSignatureFetcher}
        acceptOfferFetcher={acceptOfferFetcher}
        completeOfferFetcher={completeOfferFetcher}
        rejectOfferFetcher={rejectOfferFetcher}
        cancelOfferFetcher={cancelOfferFetcher}
      />
    )
  },
  args: {
    state: DEFAULT_STATE,
    expired: DEFAULT_EXPIRED,
    isCreator: DEFAULT_IS_CREATOR
  }
}
