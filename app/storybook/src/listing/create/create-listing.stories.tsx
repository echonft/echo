// noinspection JSUnusedGlobalSymbols

import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { nftMocksJohnny } from '@echo/model/mocks/nft-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { CreateListing as Component } from '@echo/ui/components/listing/create/create-listing'
import type { Meta, StoryObj } from '@storybook/react'
import { filter, pathEq } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Create',
  component: Component,
  args: {
    creator: userMockJohnny,
    creatorNfts: nftMocksJohnny,
    loading: false
  },
  argTypes: {
    onCancel: {
      table: {
        disable: true
      }
    },
    onComplete: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['collections', 'creatorNfts', 'items', 'target', 'loading']
    }
  }
}
export default metadata

export const FromCollection: StoryObj<typeof Component> = {
  args: {
    items: undefined,
    target: collectionMockPx
  }
}

export const FromProfile: StoryObj<typeof Component> = {
  args: {
    items: filter(pathEq(collectionMockPx.slug, ['collection', 'slug']), nftMocksJohnny),
    target: undefined
  }
}
