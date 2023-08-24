import { getCollectionById } from '../../mocks/model/nft-collection'
import { CollectionLinks as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Links',
  component: Component
}

export default metadata
const collection = getCollectionById('Rc8pLQXxgyQGIRL0fr13')
type Story = StoryObj<typeof Component>

export const CollectionLinks: Story = {
  args: {
    websiteUrl: collection.websiteUrl,
    discordUrl: collection.discordUrl,
    twitterUsername: collection.twitterUsername
  },
  render: ({ websiteUrl, discordUrl, twitterUsername }) => (
    <Component websiteUrl={websiteUrl} discordUrl={discordUrl} twitterUsername={twitterUsername} />
  )
}
