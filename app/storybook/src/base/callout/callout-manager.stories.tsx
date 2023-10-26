import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { CalloutVariant } from '@echo/ui/constants/callout-variant'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import type { Alert } from '@echo/ui/types/alert'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

const DEFAULT_SEVERITY = CalloutSeverity.ERROR
const DEFAULT_VARIANT = CalloutVariant.SOLID
const DEFAULT_MESSAGE = 'This is an alert!'
type ComponentType = FunctionComponent<Alert>
const metadata: Meta<ComponentType> = {
  title: 'Base/Callout/Managed',
  argTypes: {
    severity: {
      defaultValue: DEFAULT_SEVERITY,
      options: Object.values(CalloutSeverity),
      control: { type: 'radio' }
    },
    variant: {
      defaultValue: DEFAULT_VARIANT,
      options: Object.values(CalloutVariant),
      control: { type: 'radio' }
    },
    message: {
      defaultValue: DEFAULT_MESSAGE
    }
  }
}

export default metadata

type Story = StoryObj<ComponentType>

export const Managed: Story = {
  render: (alert) => {
    const { show } = useAlertStore()
    return (
      <>
        <button onClick={() => show(alert)} className={'btn-gradient group btn-size-alt'}>
          <span className={'prose-label-sm-semi btn-label-gradient'}>Show</span>
        </button>
        <CalloutManager />
      </>
    )
  },
  args: {
    severity: DEFAULT_SEVERITY,
    variant: DEFAULT_VARIANT,
    message: DEFAULT_MESSAGE
  }
}
