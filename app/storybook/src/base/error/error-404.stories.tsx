import { Error404 as Component } from '@echo/ui/components/error/error-404'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Error/Not Found',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const NotFound: Story = {}
