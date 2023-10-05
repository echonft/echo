import { CollectionDetails as Component } from '@echo/ui/components/collection/details/collection-details'
import { SizeLG } from '@echo/ui/constants/size'
import { getCollectionById } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Details',
  component: Component
}

export default metadata

const { name, profilePictureUrl, totalSupply, discordUrl, twitterUsername, websiteUrl, bannerUrl, description } =
  getCollectionById('Rc8pLQXxgyQGIRL0fr13')
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    collectionName: name,
    supplyCount: totalSupply,
    pictureUrl: profilePictureUrl,
    discordUrl,
    twitterUsername,
    websiteUrl,
    bannerUrl,
    description,
    size: SizeLG
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
    bannerUrl,
    description,
    verified: true,
    size: SizeLG
  }
}
