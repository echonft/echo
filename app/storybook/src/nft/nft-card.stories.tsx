// noinspection JSUnusedGlobalSymbols

import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import { NftCard as Component } from '@echo/ui/components/nft/card/nft-card'
import { CARD_VARIANT_REDUCED } from '@echo/ui/constants/card-variants'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

interface Args {
  hideOwner: boolean
  hideOpenSeaLink: boolean
  scaleDisabled: boolean
  reduced: boolean
}
type ComponentType = FunctionComponent<Args>

const metadata: Meta<ComponentType> = {
  title: 'NFT/Card',
  args: {
    hideOwner: false,
    hideOpenSeaLink: false,
    scaleDisabled: false,
    reduced: false
  },
  argTypes: {
    reduced: {
      defaultValue: false,
      description: '"reduced" style variant',
      control: 'boolean'
    },
    hideOwner: {
      defaultValue: false,
      description: 'Hide the owner Discord tag',
      control: 'boolean'
    },
    hideOpenSeaLink: {
      defaultValue: false,
      description: 'Hide the NFT OpenSea link icon',
      control: 'boolean'
    },
    scaleDisabled: {
      description: 'Disable scaling of the image on hover',
      defaultValue: false,
      control: 'boolean'
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ reduced, hideOwner, hideOpenSeaLink, scaleDisabled }) => {
    return (
      <Component
        nft={getNftMock()}
        options={{
          owner: {
            hide: hideOwner
          },
          style: {
            hideOpenSeaLink,
            scaleDisabled,
            variant: reduced ? CARD_VARIANT_REDUCED : undefined
          }
        }}
      />
    )
  }
}
