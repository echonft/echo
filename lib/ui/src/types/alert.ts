import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { CalloutVariant } from '@echo/ui/constants/callout-variant'

export interface Alert {
  severity: CalloutSeverity
  variant?: CalloutVariant
  message: string
}
