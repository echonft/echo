// noinspection JSUnusedGlobalSymbols

import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { CollectionProfile as Component } from '@echo/ui/components/collection/details/collection-profile'
import { SIZE_LG } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Profile',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const { name, twitterUsername, totalSupply, profilePictureUrl, discordUrl, websiteUrl } =
  getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')

export const Default: Story = {
  args: {
    collectionName: name,
    supplyCount: totalSupply,
    pictureUrl: profilePictureUrl,
    discordUrl,
    twitterUsername,
    websiteUrl,
    size: SIZE_LG
  }
}

export const Verified: Story = {
  args: {
    collectionName: name,
    supplyCount: totalSupply,
    pictureUrl: profilePictureUrl,
    discordUrl,
    twitterUsername,
    websiteUrl,
    verified: true,
    size: SIZE_LG
  }
}
