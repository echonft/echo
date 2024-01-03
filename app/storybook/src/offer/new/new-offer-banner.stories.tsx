import { NewOfferBanner as Component } from '@echo/ui/components/offer/new/new-offer-banner'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/Banner',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {}
