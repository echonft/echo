import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { LoginStepContainer as Component } from '@echo/ui/components/auth/login-step-container'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Auth/Login Flow',
  component: Component,
  argTypes: {
    currentStep: { control: { type: 'number', min: 0, max: 2, step: 1 } },
    totalSteps: {
      table: {
        disable: true
      }
    },
    user: {
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
    user: getAuthUserMockByUsername('johnnycagewins')
  }
}

export const Managed: Story = {
  args: {
    totalSteps: 3,
    currentStep: 0,
    user: getAuthUserMockByUsername('johnnycagewins')
  },
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)
    return (
      <Component
        currentStep={currentStep}
        totalSteps={3}
        user={getAuthUserMockByUsername('johnnycagewins')}
        onContinue={() => {
          if (currentStep < 2) {
            setCurrentStep((prevState) => prevState + 1)
          }
        }}
      />
    )
  }
}
