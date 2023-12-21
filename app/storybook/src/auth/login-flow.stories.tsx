import { authUserMock } from '@echo/model-mocks/auth-user/auth-user-mock'
import { LoginStepContainer as Component } from '@echo/ui/components/auth/login-step-container'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Auth/Login Flow',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    totalSteps: 3,
    currentStep: 0
  }
}

export const WithUser: Story = {
  args: {
    totalSteps: 3,
    currentStep: 0,
    user: authUserMock
  }
}

export const Managed: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)
    return (
      <Component
        currentStep={currentStep}
        totalSteps={3}
        user={authUserMock}
        onContinue={() => {
          if (currentStep < 2) {
            setCurrentStep((prevState) => prevState + 1)
          }
        }}
      />
    )
  }
}
