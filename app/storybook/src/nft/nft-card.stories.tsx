// noinspection JSUnusedGlobalSymbols

import { Chain } from '@echo/model/constants/chain'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { OwnedNft } from '@echo/model/types/nft'
import { NftCard as Component } from '@echo/ui/components/nft/card/nft-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { assocPath } from 'ramda'
import { type FunctionComponent } from 'react'

interface Args {
  readonly hideOwner: boolean
  readonly hideOpenSeaLink: boolean
  readonly scaleDisabled: boolean
  readonly chain: Chain
}

type ComponentType = FunctionComponent<Args>

const metadata: Meta<ComponentType> = {
  title: 'NFT/Card',
  args: {
    hideOwner: false,
    hideOpenSeaLink: false,
    scaleDisabled: false,
    chain: Chain.Ethereum
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
    },
    chain: {
      options: [Chain.Ethereum, Chain.Sei, Chain.Blast],
      control: { type: 'select' }
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ hideOwner, hideOpenSeaLink, scaleDisabled, chain }) => {
    return (
      <Component
        nft={assocPath<Chain, OwnedNft>(['collection', 'contract', 'chain'], chain)(nftMockSpiral1)}
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
