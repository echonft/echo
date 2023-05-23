import { mockNftCollection } from '@echo/model'
import { CollectionLinks as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Collection Links',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const CollectionLinks: Story = {
  args: {
    websiteUrl: mockNftCollection.openSea!.externalUrl,
    discordUrl: mockNftCollection.openSea!.discordUrl,
    twitterUsername: mockNftCollection.openSea!.twitterUsername
  },
  render: ({ websiteUrl, discordUrl, twitterUsername }) => (
    <Component websiteUrl={websiteUrl} discordUrl={discordUrl} twitterUsername={twitterUsername} />
  )
}
