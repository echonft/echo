import { Error500Page as Component } from '@echo/ui/pages/error/error-500-page'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Error505',
  component: Component,
  args: {
    error: Error('this is an error'),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    reset: () => {}
  },
  parameters: {
    controls: {
      exclude: ['error', 'reset']
    }
  }
}

export default metadata

export const Error505: StoryObj<typeof Component> = {}
