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

export const Details: Story = {
  args: {
    collectionName: name,
    supplyCount: totalSupply,
    pictureUrl: profilePictureUrl,
    discordUrl: discordUrl,
    twitterUsername: twitterUsername,
    websiteUrl: websiteUrl,
    bannerUrl: bannerUrl,
    description: description,
    size: SizeLG
  }
}
