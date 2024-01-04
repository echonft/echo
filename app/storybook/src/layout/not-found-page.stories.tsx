import { NotFoundPage as Component } from '@echo/ui/components/page/not-found-page'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Not Found',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const NotFound: Story = {}
