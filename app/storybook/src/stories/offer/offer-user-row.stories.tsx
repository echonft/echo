import { getOfferById } from '../../mocks/model/offer'
import { OfferUserRow as Component, OfferUserRowSkeleton } from '@echo/ui'
import { OfferRoleSender } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')!

const metadata: Meta<typeof Component> = {
  title: 'Offer/User Row',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer', 'role']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offer,
    role: OfferRoleSender
  }
}

export const Skeleton: Story = {
  render: () => <OfferUserRowSkeleton />
}
