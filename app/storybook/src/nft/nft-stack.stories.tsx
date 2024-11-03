// noinspection JSUnusedGlobalSymbols

import { erc721NftToToken } from '@echo/model/mappers/nft/erc721-nft-to-token'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { Erc721Nft } from '@echo/model/types/nft'
import { NftStack as Component } from '@echo/ui/components/nft/stack/nft-stack'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Stack',
  component: Component,
  args: {
    hideOwner: false,
    scaleDisabled: false
  },
  argTypes: {
    hideOwner: {
      control: 'boolean'
    },
    scaleDisabled: {
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

export const Default: StoryObj<typeof Component> = {
  render: ({ hideOwner, scaleDisabled }) => {
    const stack: NftStack = {
      owner: nftMockSpiral1.owner,
      collection: nftMockSpiral1.collection,
      pictureUrl: nftMockSpiral1.pictureUrl!,
      label: nftLabel(nftMockSpiral1),
      nfts: [erc721NftToToken(nftMockSpiral1 as Erc721Nft)]
    }
    return <Component stack={stack} hideOwner={hideOwner} scaleDisabled={scaleDisabled} />
  }
}
