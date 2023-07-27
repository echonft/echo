import { collectionProfilePictureUrl } from '../constants'
import { nftCollections } from '@echo/model'
import { CollectionDetails as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Collection Details',
  component: Component
}

export default metadata

const mockNftCollection = nftCollections['Rc8pLQXxgyQGIRL0fr13']!
type Story = StoryObj<typeof Component>

export const CollectionDetails: Story = {
  render: () => (
    <Component
      collectionName={mockNftCollection.name}
      size={10000}
      profilePictureUrl={new URL(collectionProfilePictureUrl)}
      discordUrl={mockNftCollection.discordUrl}
      twitterUsername={mockNftCollection.twitterUsername}
      websiteUrl={mockNftCollection.websiteUrl}
    />
  )
}
