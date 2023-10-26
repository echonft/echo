import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { Callout } from '@echo/ui/components/layout/callout/callout'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { Portal, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { head, isNil } from 'ramda'
import { type FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'

export const CalloutManager: FunctionComponent = () => {
  const { alerts, dismiss } = useAlertStore()
  const [show, setShow] = useState(false)
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const alert = useMemo(() => head(alerts), [alerts])

  useEffect(() => {
    if (!isNil(alert)) {
      setShow(true)
      dismissTimeoutRef.current = setTimeout(() => {
        setShow(false)
        showTimeoutRef.current = setTimeout(() => {
          dismiss()
        }, 600)
      }, 3000)
    }
  }, [dismiss, alert])

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
    <Portal>
      <Transition
        show={show}
        enter="transition duration-500 ease-out"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition duration-500 ease-out"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <div className={clsx('z-30', 'mt-4', 'mr-4')}>
          <HideIfNil
            checks={alert}
            render={(alert) => (
              <Callout severity={alert.severity} variant={alert.variant}>
                {alert.message}
              </Callout>
            )}
          />
        </div>
      </Transition>
    </Portal>
  )
}
