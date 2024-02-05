// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { NftStack as Component } from '@echo/ui/components/nft/stack/nft-stack'
import { getNftStackFromArray } from '@echo/ui/helpers/stack/get-nft-stack-from-array'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Stack',
  component: Component,
  args: {
    hideOwner: false,
    scaleDisabled: false,
    stack: pipe(getAllNftMocks, nonNullableReturn(getNftStackFromArray))()
  },
  argTypes: {
    hideOwner: {
      defaultValue: false,
      control: 'boolean'
    },
    scaleDisabled: {
      defaultValue: false,
      control: 'boolean'
    }
  },
  parameters: {
    controls: {
      exclude: ['stack']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {}
