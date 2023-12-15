import type { CreateOfferArgs } from '@echo/api/services/fetcher/create-offer'
import { authUserMock } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { NewOfferSliderManager as Component } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function createOffer(_args: CreateOfferArgs) {
  return delayPromise(
    Promise.resolve({
      offer
    })
  )
}

const user = authUserMock
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

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems(offer.receiverItems)
      setSenderItems(offer.senderItems)
    }, [])
    return <Component user={user} fetcher={{ createOffer }} />
  }
}

export const EmptySenderItems: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems(offer.receiverItems)
      setSenderItems([])
    }, [])
    return <Component user={user} fetcher={{ createOffer }} />
  }
}

export const EmptyReceiverItems: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems([])
      setSenderItems(offer.senderItems)
    }, [])
    return <Component user={user} fetcher={{ createOffer }} />
  }
}
