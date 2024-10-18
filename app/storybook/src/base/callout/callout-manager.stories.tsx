// noinspection JSUnusedGlobalSymbols

import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { CalloutVariant } from '@echo/ui/constants/callout-variant'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import type { Alert } from '@echo/ui/types/alert'
import { type Meta, type StoryObj } from '@storybook/react'
import { values } from 'ramda'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<Alert>
const metadata: Meta<ComponentType> = {
  title: 'Base/Callout/Managed',
  args: {
    severity: CalloutSeverity.Error,
    variant: CalloutVariant.Solid,
    message: 'This is an alert!',
    permanent: false
  },
  argTypes: {
    severity: {
      defaultValue: CalloutSeverity.Error,
      options: values(CalloutSeverity),
      control: { type: 'radio' }
    },
    variant: {
      defaultValue: CalloutVariant.Solid,
      options: values(CalloutVariant),
      control: { type: 'radio' }
    },
    permanent: {
      defaultValue: false,
      control: { type: 'boolean' }
    },
    message: {
      defaultValue: 'This is an alert!'
    }
  }
}

export default metadata

export const Managed: StoryObj<ComponentType> = {
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
  }
}
