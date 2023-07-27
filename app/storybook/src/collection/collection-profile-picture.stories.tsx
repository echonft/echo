import { collectionProfilePictureUrl } from '../constants'
import { ProfilePicture as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Collection Profile Picture',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  render: () => <Component collectionName={'johnnycage'} profilePictureUrl={new URL(collectionProfilePictureUrl)} />
}

export const Default: Story = {
  render: () => <Component collectionName={'johnnycage'} profilePictureUrl={undefined} />
}
