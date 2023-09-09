import { getOfferById } from '../../mocks/model/offer'
import {
  CurrentUserOfferRow as Component,
  CurrentUserOfferRowSkeleton,
  OfferRoleReceiver,
  OfferRoleSender
} from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')!

const metadata: Meta<typeof Component> = {
  title: 'Offer/Row',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer', 'role']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const CurrentUserSender: Story = {
  args: {
    offer,
    role: OfferRoleSender
  }
}

export const CurrentUserReceiver: Story = {
  args: {
    offer,
    role: OfferRoleReceiver
  }
}

export const Skeleton: Story = {
  render: () => <CurrentUserOfferRowSkeleton />
}
