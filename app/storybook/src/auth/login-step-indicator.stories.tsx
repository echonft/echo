import { LoginStepIndicator as Component } from '@echo/ui/components/auth/login-step-indicator'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Auth/Login Step Indicator',
  component: Component,
  argTypes: {
    currentStep: { control: { type: 'number', min: 0, max: 2, step: 1 } },
    totalSteps: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['totalSteps', 'user']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const LoginStepIndicator: Story = {
  args: {
    currentStep: 0,
    totalSteps: 3
  }
}
