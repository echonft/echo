import { LoginStepIndicator as Component } from '@echo/ui/components/auth/login-step-indicator'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Auth/Login Flow',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3
  }
}
