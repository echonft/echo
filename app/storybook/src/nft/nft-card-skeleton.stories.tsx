// noinspection JSUnusedGlobalSymbols

import { NftCardSkeleton as Component } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { CARD_VARIANT_REDUCED } from '@echo/ui/constants/card-variants'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<Record<'reduced', boolean>>
const DEFAULT_REDUCED = false

const metadata: Meta<ComponentType> = {
  title: 'NFT/Card',
  argTypes: {
    reduced: {
      defaultValue: DEFAULT_REDUCED,
      control: 'boolean'
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Skeleton: Story = {
  render: ({ reduced }) => {
    return <Component variant={reduced ? CARD_VARIANT_REDUCED : undefined} />
  },
  args: {
    reduced: DEFAULT_REDUCED
  }
}
