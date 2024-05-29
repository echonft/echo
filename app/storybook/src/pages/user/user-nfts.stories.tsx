// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { UserNfts } from '@echo/ui/pages/user/nfts/user-nfts'
import type { Meta, StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  isAuthUser: boolean
}>
const metadata: Meta<ComponentType> = {
  title: 'Pages/User/Nfts',
  args: {
    isAuthUser: false
  },
  argTypes: {
    isAuthUser: {
      control: { type: 'boolean' }
    }
  },
  parameters: {
    controls: {
      exclude: ['nfts']
    }
  }
}

export default metadata

export const Nfts: StoryObj<ComponentType> = {
  render: ({ isAuthUser }) => <UserNfts isAuthUser={isAuthUser} nfts={getAllNftMocks()} />
}
