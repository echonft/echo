import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { authUserMock } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { NewOfferSliderManager as Component } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/Bottom Slider',
  component: Component,
  parameters: {
    controls: {
      exclude: ['createOfferFetcher', 'user']
    }
  }
}

export default metadata

const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
const createOfferFetcher = (_parameters: CreateOfferRequest, _token: string | undefined) =>
  delayPromise(
    Promise.resolve({
      offer
    })
  )
const user = authUserMock

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems(offer.receiverItems)
      setSenderItems(offer.senderItems)
    }, [])
    return <Component user={user} createOfferFetcher={createOfferFetcher} />
  }
}

export const EmptySenderItems: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems(offer.receiverItems)
      setSenderItems([])
    }, [])
    return <Component user={user} createOfferFetcher={createOfferFetcher} />
  }
}

export const EmptyReceiverItems: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems([])
      setSenderItems(offer.senderItems)
    }, [])
    return <Component user={user} createOfferFetcher={createOfferFetcher} />
  }
}
