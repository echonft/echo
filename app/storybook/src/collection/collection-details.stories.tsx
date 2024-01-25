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
const DEFAULT_DEFAULT_BANNER = false
const DEFAULT_DEFAULT_PICTURE = false
const DEFAULT_VERIFIED = false

const metadata: Meta<ComponentType> = {
  title: 'Collection/Details',
  argTypes: {
    defaultBanner: {
      defaultValue: DEFAULT_DEFAULT_BANNER,
      control: { type: 'boolean' }
    },
    defaultPicture: {
      defaultValue: DEFAULT_DEFAULT_PICTURE,
      control: { type: 'boolean' }
    },
    verified: {
      defaultValue: DEFAULT_VERIFIED,
      control: { type: 'boolean' }
    }
  }
}

export default metadata
type Story = StoryObj<ComponentType>

export const Details: Story = {
  args: {
    defaultBanner: DEFAULT_DEFAULT_BANNER,
    defaultPicture: DEFAULT_DEFAULT_PICTURE,
    verified: DEFAULT_VERIFIED
  },
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
