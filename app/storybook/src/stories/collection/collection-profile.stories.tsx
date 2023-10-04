import { CollectionProfile as Component } from '@echo/ui/components/collection/details/collection-profile'
import { SizeLG } from '@echo/ui/constants/size'
import { getCollectionById } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Profile',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const { name, twitterUsername, totalSupply, profilePictureUrl, discordUrl, websiteUrl } =
  getCollectionById('Rc8pLQXxgyQGIRL0fr13')

export const Default: Story = {
  args: {
    collectionName: name,
    supplyCount: totalSupply,
    pictureUrl: profilePictureUrl.href,
    discordUrl,
    twitterUsername,
    websiteUrl,
    size: SizeLG
  }
}

export const Verified: Story = {
  args: {
    collectionName: name,
    supplyCount: totalSupply,
    pictureUrl: profilePictureUrl.href,
    discordUrl,
    twitterUsername,
    websiteUrl,
    verified: true,
    size: SizeLG
  }
}
