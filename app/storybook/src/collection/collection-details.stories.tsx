// noinspection JSUnusedGlobalSymbols

import type { Collection } from '@echo/model/types/collection'
import { getCollectionMock } from '@echo/model-mocks/collection/get-collection-mock'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, dissoc, pipe, when } from 'ramda'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<
  Record<'defaultBanner', boolean> & Record<'defaultPicture', boolean> & Record<'verified', boolean>
>

const metadata: Meta<ComponentType> = {
  title: 'Collection/Details',
  args: {
    defaultBanner: false,
    defaultPicture: false,
    verified: false
  },
  argTypes: {
    defaultBanner: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
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
  render: ({ defaultBanner, defaultPicture, verified }) => {
    const collection = pipe<[], Collection, Collection, Collection, Collection>(
      getCollectionMock,
      when<Collection, Collection>(always(defaultBanner), dissoc('bannerUrl')),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when<Collection, Collection>(always(defaultPicture), dissoc('profilePictureUrl')),
      assoc('verified', verified)
    )() as Collection
    return <CollectionDetails collection={collection} />
  }
}
