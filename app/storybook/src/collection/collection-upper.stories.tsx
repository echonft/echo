import { collectionProfilePictureUrl } from '../constants'
import { nftCollections } from '@echo/model'
import { CollectionUpper as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Collection Upper',
  component: Component
}

export default metadata

const mockNftCollection = nftCollections['Rc8pLQXxgyQGIRL0fr13']!
type Story = StoryObj<typeof Component>

export const CollectionUpper: Story = {
  render: () => (
    <Component
      collectionName={mockNftCollection.name}
      size={10000}
      profilePictureUrl={new URL(collectionProfilePictureUrl)}
      discordUrl={mockNftCollection.discordUrl}
      twitterUsername={mockNftCollection.twitterUsername}
      websiteUrl={mockNftCollection.websiteUrl}
      bannerUrl={mockNftCollection.bannerUrl}
      description={
        'A handcrafted collection of 10,000 characters developed by artist DirtyRobot. Each with their own identity to be discovered within the wider stories of RENGA. In its purest form, RENGA is the art of storytelling'
      }
    />
  )
}
