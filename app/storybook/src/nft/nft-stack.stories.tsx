// noinspection JSUnusedGlobalSymbols

import { erc721NftToToken } from '@echo/model/mappers/nft/erc721-nft-to-token'
import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import { NftStack as Component } from '@echo/ui/components/nft/stack/nft-stack'
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

export const Default: StoryObj<typeof Component> = {
  render: ({ hideOwner, scaleDisabled }) => {
    const nft = getNftMock()
    const stack: NftStack = {
      owner: nft.owner,
      collection: nft.collection,
      pictureUrl: nft.pictureUrl!,
      tokenIdLabel: nft.tokenIdLabel,
      nfts: [erc721NftToToken(nft as Erc721Nft)]
    }
    return <Component stack={stack} hideOwner={hideOwner} scaleDisabled={scaleDisabled} />
  }
}
