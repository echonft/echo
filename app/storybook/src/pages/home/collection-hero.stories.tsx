// noinspection JSUnusedGlobalSymbols

import { collectionMockPxId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { type Collection } from '@echo/model/types/collection'
import type { CollectionWithSwapsCount } from '@echo/model/types/collection-with-swaps-count'
import { HomeHero as Component } from '@echo/ui/pages/home/hero/home-hero'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Hero',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collection']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    collection: pipe<[string], Collection, CollectionWithSwapsCount>(
      getCollectionMockById,
      assoc('swapsCount', 2)
    )(collectionMockPxId())
  }
}
