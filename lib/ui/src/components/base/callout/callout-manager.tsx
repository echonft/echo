'use client'
import { CalloutManagerContent } from '@echo/ui/components/base/callout/callout-manager-content'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { clsx } from 'clsx'
import { head, isNil } from 'ramda'
import { type FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'

export const CalloutManager: FunctionComponent = () => {
  const { alerts, dismiss } = useAlertStore()
  const [show, setShow] = useState(false)
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const alert = head(alerts)
  const delayedDismiss = useCallback(() => {
    setShow(false)
    showTimeoutRef.current = setTimeout(() => {
      dismiss()
    }, 600)
  }, [setShow, dismiss])
  useEffect(() => {
    if (!isNil(alert)) {
      setShow(true)
      if (!alert.permanent) {
        dismissTimeoutRef.current = setTimeout(delayedDismiss, 3000)
      }
    }
  }, [delayedDismiss, alert])
  useEffect(() => {
    return (): void => {
      if (!isNil(dismissTimeoutRef.current)) {
        clearTimeout(dismissTimeoutRef.current)
      }
      if (!isNil(showTimeoutRef.current)) {
        clearTimeout(showTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={clsx('fixed', 'z-40', 'bottom-4', 'right-4', 'w-max', 'h-max')}>
      <CalloutManagerContent
        alert={alert}
        show={show}
        onClick={(_event) => {
          if (alert?.permanent) {
            delayedDismiss()
          }
        }}
      />
    </div>
  )
}
