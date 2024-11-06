// noinspection JSUnusedGlobalSymbols

import { collectionWithCountsMock } from '@echo/model/mocks/collection-mock'
import type { CollectionWithCounts } from '@echo/model/types/collection'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, dissoc, when } from 'ramda'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  defaultPicture: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Collection/Details',
  args: {
    defaultPicture: false
  },
  argTypes: {
    defaultPicture: {
      control: { type: 'boolean' }
    }
  }
}

export default metadata

export const Details: StoryObj<ComponentType> = {
  render: ({ defaultPicture }) => {
    const collection = when<CollectionWithCounts, CollectionWithCounts>(
      always(defaultPicture),
      dissoc('pictureUrl'),
      collectionWithCountsMock
    )
    return <CollectionDetails collection={collection} />
  }
}
