// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { NftStack as Component } from '@echo/ui/components/nft/stack/nft-stack'
import { getNftStackFromArray } from '@echo/ui/helpers/stack/get-nft-stack-from-array'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Stack',
  component: Component,
  parameters: {
    controls: {
      exclude: 'stack'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Stack: Story = {
  args: {
    stack: pipe(getAllNftMocks, getNftStackFromArray)()
  }
}
