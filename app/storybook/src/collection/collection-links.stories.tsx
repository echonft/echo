// noinspection JSUnusedGlobalSymbols

import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { CollectionLinks as Component } from '@echo/ui/components/collection/details/collection-links'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Links',
  component: Component
}

export default metadata
const { websiteUrl, discordUrl, twitterUsername } = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
type Story = StoryObj<typeof Component>

export const CollectionLinks: Story = {
  args: {
    websiteUrl: websiteUrl,
    discordUrl: discordUrl,
    twitterUsername: twitterUsername
  }
}
