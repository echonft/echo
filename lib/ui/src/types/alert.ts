import type { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import type { CalloutVariant } from '@echo/ui/constants/callout-variant'

export interface Alert {
  message: string
  severity: CalloutSeverity
  permanent?: boolean
  variant?: CalloutVariant
}
