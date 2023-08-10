import { nftCollections } from '@echo/model'
import { CollectionDetails as Component, CollectionDetailsSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Details',
  component: Component
}

export default metadata

const mockNftCollection = nftCollections['Rc8pLQXxgyQGIRL0fr13']!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => (
    <Component
      collectionName={mockNftCollection.name}
      size={10000}
      pictureUrl={mockNftCollection.profilePictureUrl}
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

export const Skeleton: Story = {
  render: () => <CollectionDetailsSkeleton />
}
