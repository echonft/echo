// noinspection JSUnusedGlobalSymbols

import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { type Meta, type StoryObj } from '@storybook/react'
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
    const { name, profilePictureUrl, totalSupply, discordUrl, twitterUsername, websiteUrl, bannerUrl, description } =
      getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    return (
      <CollectionDetails
        description={description}
        supplyCount={totalSupply}
        collectionName={name}
        pictureUrl={defaultPicture ? undefined : profilePictureUrl}
        discordUrl={discordUrl}
        twitterUsername={twitterUsername}
        websiteUrl={websiteUrl}
        bannerUrl={defaultBanner ? undefined : bannerUrl}
        verified={verified}
      />
    )
  }
}
