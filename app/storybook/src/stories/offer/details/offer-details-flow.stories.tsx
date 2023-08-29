import { getUserById } from '../../../mocks/model/user'
import { OfferDetails as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Flow',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer', 'user', 'offerId']
    }
  }
}

export default metadata

const user = getUserById('oE6yUEQBPn7PZ89yMjKn')
type Story = StoryObj<typeof Component>

export const Receiver: Story = {
  args: {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    user,
    renderModal: true
  }
}
export const Sender: Story = {
  args: {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    user: {
      id: '6rECUMhevHfxABZ1VNOm',
      discordId: '884593489189433364',
      discordUsername: 'crewNFT_#2034',
      discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
      discordBanner: '17f80cca207c35c7fa6d0194696c5e7b'
    },
    renderModal: true
  }
}
