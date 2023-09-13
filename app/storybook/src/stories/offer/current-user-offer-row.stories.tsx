import { CurrentUserOfferRow as Component } from '@echo/ui/components/offer/row/current-user-offer-row'
import { OfferRoleSender } from '@echo/ui/constants/offer-role'
import { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { getOfferById } from '@mocks/model/offer'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Current User/Row',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer', 'role']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

const offer = pipe(
  assoc('role', OfferRoleSender),
  assoc('expired', false)
)(getOfferById('LyCfl6Eg7JKuD7XJ6IPi')) as OfferWithRole

export const Row: Story = {
  args: {
    offer
  }
}
