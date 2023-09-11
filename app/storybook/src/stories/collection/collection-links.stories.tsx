import { getCollectionById } from '../../mocks/model/nft-collection'
import { CollectionLinks as Component } from '@echo/ui/src/components/collection/details/collection-links'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Links',
  component: Component
}

export default metadata
const { websiteUrl, discordUrl, twitterUsername } = getCollectionById('Rc8pLQXxgyQGIRL0fr13')
type Story = StoryObj<typeof Component>

export const CollectionLinks: Story = {
  args: {
    websiteUrl: websiteUrl,
    discordUrl: discordUrl,
    twitterUsername: twitterUsername
  }
}
