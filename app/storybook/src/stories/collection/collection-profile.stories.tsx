import { getCollectionById } from '../../mocks/model/nft-collection'
import { CollectionProfile as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Profile',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const { name, twitterUsername, totalSupply, profilePictureUrl, discordUrl, websiteUrl } =
  getCollectionById('Rc8pLQXxgyQGIRL0fr13')

export const Profile: Story = {
  args: {
    collectionName: name,
    size: totalSupply,
    pictureUrl: profilePictureUrl,
    discordUrl,
    twitterUsername,
    websiteUrl
  }
}
