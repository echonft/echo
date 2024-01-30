// noinspection JSUnusedGlobalSymbols

import { LoginStepIndicator as Component } from '@echo/ui/components/auth/login-step-indicator'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Login/Step Indicator',
  component: Component,
  args: {
    step: 1
  },
  argTypes: { step: { defaultValue: 1, control: { type: 'number', min: 1, max: 3, step: 1 } } }
}

export default metadata

export const LoginStepIndicator: StoryObj<typeof Component> = {}
