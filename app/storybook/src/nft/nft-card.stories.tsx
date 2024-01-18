// noinspection JSUnusedGlobalSymbols

import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import { NftCard as Component, type NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { NFT_CARD_VARIANT_REDUCED } from '@echo/ui/constants/nft-card-variants'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

interface Args extends Omit<NftCardProps, 'variant'> {
  reduced: boolean
}
type ComponentType = FunctionComponent<Args>
const DEFAULT_REDUCED = false
const DEFAULT_HIDE_OWNER = false
const DEFAULT_HIDE_LINK = false

const metadata: Meta<ComponentType> = {
  title: 'NFT/Card',
  argTypes: {
    reduced: {
      defaultValue: DEFAULT_REDUCED,
      control: 'boolean'
    },
    hideOwner: {
      defaultValue: DEFAULT_HIDE_OWNER,
      control: 'boolean'
    },
    hideLink: {
      defaultValue: DEFAULT_HIDE_LINK,
      control: 'boolean'
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Card: Story = {
  args: {
    reduced: DEFAULT_REDUCED,
    hideOwner: DEFAULT_HIDE_OWNER,
    hideLink: DEFAULT_HIDE_LINK
  },
  render: ({ reduced, hideOwner, hideLink }) => {
    return (
      <Component
        nft={getNftMock()}
        variant={reduced ? NFT_CARD_VARIANT_REDUCED : undefined}
        hideOwner={hideOwner}
        hideLink={hideLink}
      />
    )
  }
}
