import type { CalloutSeverity } from '@echo/ui/types/callout-severity'
import type { CalloutVariant } from '@echo/ui/types/callout-variant'

export interface Alert {
  severity: CalloutSeverity
  variant?: CalloutVariant
  message: string
}
