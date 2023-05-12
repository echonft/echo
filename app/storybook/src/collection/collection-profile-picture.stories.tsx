import { collectionProfilePictureUrl } from '../constants'
import { ProfilePicture as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Collection Profile Picture',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  render: () => <Component name={'johnnycage'} src={collectionProfilePictureUrl} />
}

export const Default: Story = {
  render: () => <Component name={'johnnycage'} src={undefined} />
}
