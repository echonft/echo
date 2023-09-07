import { getCollectionById } from '../../mocks/model/nft-collection'
import { CollectionDetails as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Details',
  component: Component
}

export default metadata

const collection = getCollectionById('Rc8pLQXxgyQGIRL0fr13')
type Story = StoryObj<typeof Component>

export const Details: Story = {
  render: () => (
    <Component
      collectionName={collection.name}
      size={10000}
      pictureUrl={collection.profilePictureUrl}
      discordUrl={collection.discordUrl}
      twitterUsername={collection.twitterUsername}
      websiteUrl={collection.websiteUrl}
      bannerUrl={collection.bannerUrl}
      description={
        'A handcrafted collection of 10,000 characters developed by artist DirtyRobot. Each with their own identity to be discovered within the wider stories of RENGA. In its purest form, RENGA is the art of storytelling'
      }
    />
  )
}
