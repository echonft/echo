// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { NftStack as Component } from '@echo/ui/components/nft/stack/nft-stack'
import { getNftStackFromArray } from '@echo/ui/helpers/stack/get-nft-stack-from-array'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe } from 'ramda'

const DEFAULT_HIDE_OWNER = false
const DEFAULT_SCALE_DISABLED = false

const metadata: Meta<typeof Component> = {
  title: 'NFT/Stack',
  component: Component,
  args: {
    hideOwner: DEFAULT_HIDE_OWNER,
    scaleDisabled: DEFAULT_SCALE_DISABLED,
    stack: pipe(getAllNftMocks, getNftStackFromArray)()
  },
  argTypes: {
    hideOwner: {
      defaultValue: DEFAULT_HIDE_OWNER,
      control: 'boolean'
    },
    scaleDisabled: {
      defaultValue: DEFAULT_SCALE_DISABLED,
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

type Story = StoryObj<typeof Component>

export const Default: Story = {}
