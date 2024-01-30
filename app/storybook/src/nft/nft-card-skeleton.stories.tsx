// noinspection JSUnusedGlobalSymbols

import { NftCardSkeleton as Component } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { CARD_VARIANT_REDUCED } from '@echo/ui/constants/card-variants'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{ reduced: boolean }>

const metadata: Meta<ComponentType> = {
  title: 'NFT/Card',
  args: {
    reduced: false
  },
  argTypes: {
    reduced: {
      defaultValue: false,
      control: 'boolean'
    }
  }
}

export default metadata

export const Skeleton: StoryObj<ComponentType> = {
  render: ({ reduced }) => {
    return <Component variant={reduced ? CARD_VARIANT_REDUCED : undefined} />
  }
}
