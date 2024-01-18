// noinspection JSUnusedGlobalSymbols

import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { NewOfferManager as Component } from '@echo/ui/components/offer/new/new-offer-manager'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function createOffer(_args: CreateOfferRequest) {
  return delayPromise(
    Promise.resolve({
      offer
    })
  )
}

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
    return <Component fetcher={{ createOffer }} />
  }
}

export const EmptySenderItems: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems(offer.receiverItems)
      setSenderItems([])
    }, [])
    return <Component fetcher={{ createOffer }} />
  }
}

export const EmptyReceiverItems: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems([])
      setSenderItems(offer.senderItems)
    }, [])
    return <Component fetcher={{ createOffer }} />
  }
}
