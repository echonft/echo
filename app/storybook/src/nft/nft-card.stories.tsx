// noinspection JSUnusedGlobalSymbols

import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import { NftCard as Component } from '@echo/ui/components/nft/card/nft-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

interface Args {
  hideOwner: boolean
  hideOpenSeaLink: boolean
  scaleDisabled: boolean
}

type ComponentType = FunctionComponent<Args>

const metadata: Meta<ComponentType> = {
  title: 'NFT/Card',
  args: {
    hideOwner: false,
    hideOpenSeaLink: false,
    scaleDisabled: false
  },
  argTypes: {
    hideOwner: {
      description: 'Hide the owner Discord tag',
      control: 'boolean'
    },
    hideOpenSeaLink: {
      description: 'Hide the NFT OpenSea link icon',
      control: 'boolean'
    },
    scaleDisabled: {
      description: 'Disable scaling of the image on hover',
      control: 'boolean'
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ hideOwner, hideOpenSeaLink, scaleDisabled }) => {
    return (
      <Component
        nft={nftMockSpiral1}
        options={{
          owner: {
            hide: hideOwner
          },
          style: {
            hideOpenSeaLink,
            scaleDisabled
          }
        }}
      />
    )
  }
}
