import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferRow as Component } from '@echo/ui/components/offer/row/offer-row'
import { OfferRoleSender } from '@echo/ui/constants/offer-role'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

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

const offer = pipe(
  assoc('role', OfferRoleSender),
  assoc('expired', false)
)(getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')) as OfferWithRole

export const Default: Story = {
  args: {
    offer
  }
}
