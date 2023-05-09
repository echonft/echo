import { ProfilePicture as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Collection Profile Picture',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  render: () => (
    <Component
      name={'johnnycage'}
      src={'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/sunflyers-pfp.jpg?alt=media'}
    />
  )
}

export const Default: Story = {
  render: () => <Component name={'johnnycage'} src={undefined} />
}
