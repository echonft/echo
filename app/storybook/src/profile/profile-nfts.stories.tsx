import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { ProfileNfts as Component } from '@echo/ui/pages/profile/nfts/profile-nfts'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Profile/Nfts',
  component: Component,
  args: {
    nfts: getAllNftMocks()
  },
  argTypes: {
    onCreateListing: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['nfts']
    }
  }
}

export default metadata

export const Nfts: StoryObj<typeof Component> = {}
