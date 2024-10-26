// noinspection JSUnusedGlobalSymbols

import { getCollectionWithCountsMock } from '@echo/model/mocks/collection/get-collection-with-counts-mock'
import type { CollectionWithCounts } from '@echo/model/types/collection'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, dissoc, pipe, when } from 'ramda'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  defaultPicture: boolean
  verified: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Collection/Details',
  args: {
    defaultPicture: false,
    verified: false
  },
  argTypes: {
    defaultPicture: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    verified: {
      defaultValue: false,
      control: { type: 'boolean' }
    }
  }
}

export default metadata

export const Details: StoryObj<ComponentType> = {
  render: ({ defaultPicture, verified }) => {
    const collection = pipe<[], CollectionWithCounts, CollectionWithCounts, CollectionWithCounts>(
      getCollectionWithCountsMock,
      when<CollectionWithCounts, CollectionWithCounts>(always(defaultPicture), dissoc('profilePictureUrl')),
      assoc('verified', verified)
    )()
    return <CollectionDetails collection={collection} />
  }
}
