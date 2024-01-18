// noinspection JSUnusedGlobalSymbols

import { LoginStepIndicator as Component } from '@echo/ui/components/auth/login-step-indicator'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Login/Step Indicator',
  component: Component,
  argTypes: {
    step: { options: [1, 2, 3], control: { type: 'radio' } }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const LoginStepIndicator: Story = {
  args: {
    step: 1
  }
}
