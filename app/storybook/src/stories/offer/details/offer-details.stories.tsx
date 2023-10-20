import type { UpdateOfferAction } from '@echo/api/types/update-offer-action'
import { OFFER_STATES } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetails as Component } from '@echo/ui/components/offer/details/offer-details'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { always, assoc, ifElse, pipe } from 'ramda'
import { type FunctionComponent, useState } from 'react'

type ComponentType = FunctionComponent<
  Record<'state', OfferState> & Record<'expired', boolean> & Record<'isCreator', boolean>
>
const DEFAULT_STATE: OfferState = 'OPEN'
const DEFAULT_IS_CREATOR = true
const DEFAULT_EXPIRED = false
const EXPIRED_DATE = dayjs().subtract(2, 'd').unix()
const NOT_EXPIRED_DATE = dayjs().add(2, 'd').unix()
const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function getOfferFetcher(action: UpdateOfferAction) {
  return function (_offerId: string, _token: string) {
    return delayPromise(
      Promise.resolve({
        offer: assoc('state', action === 'CANCEL' ? 'CANCELLED' : action === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED', offer)
      }),
      800
    )
  }
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
    const [action, setAction] = useState<UpdateOfferAction>()
    const updateOfferFetcher = (_offerId: string, action: UpdateOfferAction, _token: string | undefined) => {
      setAction(action)
      return delayPromise(Promise.resolve({}), 800)
    }
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
        getOfferFetcher={getOfferFetcher(action!)}
        updateOfferFetcher={updateOfferFetcher}
      />
    )
  },
  args: {
    state: DEFAULT_STATE,
    expired: DEFAULT_EXPIRED,
    isCreator: DEFAULT_IS_CREATOR
  }
}
