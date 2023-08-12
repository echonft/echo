import { CollectionLinks as Component, nftCollections } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Links',
  component: Component
}

export default metadata
const mockNftCollection = nftCollections['Rc8pLQXxgyQGIRL0fr13']!
type Story = StoryObj<typeof Component>

export const CollectionLinks: Story = {
  args: {
    websiteUrl: mockNftCollection.websiteUrl,
    discordUrl: mockNftCollection.discordUrl,
    twitterUsername: mockNftCollection.twitterUsername
  },
  render: ({ websiteUrl, discordUrl, twitterUsername }) => (
    <Component websiteUrl={websiteUrl} discordUrl={discordUrl} twitterUsername={twitterUsername} />
  )
}
