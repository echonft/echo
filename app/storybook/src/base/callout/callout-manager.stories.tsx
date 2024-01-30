// noinspection JSUnusedGlobalSymbols

import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { CALLOUT_SEVERITIES, CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { CALLOUT_VARIANT_SOLID, CALLOUT_VARIANTS } from '@echo/ui/constants/callout-variant'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import type { Alert } from '@echo/ui/types/alert'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<Alert>
const metadata: Meta<ComponentType> = {
  title: 'Base/Callout/Managed',
  args: {
    severity: CALLOUT_SEVERITY_ERROR,
    variant: CALLOUT_VARIANT_SOLID,
    message: 'This is an alert!',
    permanent: false
  },
  argTypes: {
    severity: {
      defaultValue: CALLOUT_SEVERITY_ERROR,
      options: CALLOUT_SEVERITIES,
      control: { type: 'radio' }
    },
    variant: {
      defaultValue: CALLOUT_VARIANT_SOLID,
      options: CALLOUT_VARIANTS,
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
