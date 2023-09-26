import { NewOfferSliderManager as Component } from '@echo/ui/components/offer/new/new-offer-slider-manager'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { getOfferById } from '@mocks/model/offer'
import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/Bottom Slider',
  component: Component
}

export default metadata

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems(offer.receiverItems)
      setSenderItems(offer.senderItems)
    }, [])
    return <Component />
  }
}

export const EmptySenderItems: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems(offer.receiverItems)
      setSenderItems([])
    }, [])
    return <Component />
  }
}

export const EmptyReceiverItems: Story = {
  render: () => {
    const { setReceiverItems, setSenderItems } = useNewOfferStore()
    useEffect(() => {
      setReceiverItems([])
      setSenderItems(offer.senderItems)
    }, [])
    return <Component />
  }
}
