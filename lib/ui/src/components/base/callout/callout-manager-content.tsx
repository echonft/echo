import { Callout } from '@echo/ui/components/base/callout/callout'
import { classes } from '@echo/ui/helpers/classes'
import type { Alert } from '@echo/ui/types/alert'
import { isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  alert: Alert | undefined
  show: boolean
  onClick?: MouseEventHandler
}

export const CalloutManagerContent: FunctionComponent<Props> = ({ alert, show, onClick }) => {
  if (isNil(alert)) {
    return null
  }
  return (
    <div className={classes('h-max', 'w-max', 'transition-opacity ease-in-out', show ? 'opacity-100' : 'opacity-0')}>
      <Callout severity={alert.severity} variant={alert.variant} onClick={onClick}>
        {alert.message}
      </Callout>
    </div>
  )
}
