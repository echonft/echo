// noinspection JSUnusedGlobalSymbols

import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import { NftCard as Component, type NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { CARD_VARIANT_REDUCED } from '@echo/ui/constants/card-variants'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

interface Args extends Omit<NftCardProps, 'variant'> {
  reduced: boolean
}
type ComponentType = FunctionComponent<Args>
const DEFAULT_REDUCED = false
const DEFAULT_HIDE_OWNER = false
const DEFAULT_HIDE_LINK = false
const DEFAULT_SCALE_DISABLED = false

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
    },
    scaleDisabled: {
      defaultValue: DEFAULT_SCALE_DISABLED,
      control: 'boolean'
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Default: Story = {
  args: {
    reduced: DEFAULT_REDUCED,
    hideOwner: DEFAULT_HIDE_OWNER,
    hideLink: DEFAULT_HIDE_LINK,
    scaleDisabled: DEFAULT_SCALE_DISABLED
  },
  render: ({ reduced, hideOwner, hideLink, scaleDisabled }) => {
    return (
      <Component
        nft={getNftMock()}
        variant={reduced ? CARD_VARIANT_REDUCED : undefined}
        hideOwner={hideOwner}
        hideLink={hideLink}
        scaleDisabled={scaleDisabled}
      />
    )
  }
}
