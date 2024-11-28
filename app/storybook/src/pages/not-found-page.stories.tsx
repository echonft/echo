import { Error404Page as Component } from '@echo/ui/pages/error/error-404-page'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/NotFound',
  component: Component
}

export default metadata

export const NotFound: StoryObj<typeof Component> = {}
