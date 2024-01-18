import { Callout } from '@echo/ui/components/base/callout/callout'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { Transition } from '@headlessui/react'
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
    <Transition
      show={show}
      enter="transition duration-500 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-500 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <div className={clsx('absolute', 'z-40', 'top-4', 'right-4')}>
        <HideIfNil
          checks={alert}
          render={(alert) => (
            <Callout
              severity={alert.severity}
              variant={alert.variant}
              onClick={alert.permanent ? delayedDismiss : undefined}
            >
              {alert.message}
            </Callout>
          )}
        />
      </div>
    </Transition>
  )
}
