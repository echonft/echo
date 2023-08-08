import { Callout as Component, CalloutSeverity, CalloutVariant } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Callout',
  component: Component,
  argTypes: {
    severity: {
      options: Object.values(CalloutSeverity),
      control: { type: 'radio' }
    },
    variant: {
      options: Object.values(CalloutVariant),
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Callout: Story = {
  args: {
    severity: CalloutSeverity.INFO,
    variant: CalloutVariant.SOLID
  },
  render: ({ severity, variant }) => (
    <Component severity={severity} variant={variant}>
      {'Please connect your wallet to unlock the full experience'}
    </Component>
  )
}
