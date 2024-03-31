'use client'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { add, isNil, min, pipe } from 'ramda'
import { type FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { useLongPress } from 'use-long-press'

interface Props {
  id: string
  label: string
  message: string
  threshold?: number
  disabled?: boolean
  loading?: boolean
  onFinish?: EmptyFunction
}

export const LongPressButton: FunctionComponent<Props> = ({
  id,
  label,
  message,
  threshold = 2000,
  disabled,
  loading,
  onFinish
}) => {
  const buttonId = `long-press-btn-${id}`
  const increment = 20
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const [progress, setProgress] = useState(0)
  const progressPercentage = Math.ceil((progress / threshold) * 100)
  function clearLongPressInterval() {
    if (!isNil(intervalRef.current)) {
      clearInterval(intervalRef.current)
    }
  }
  const onCancel = useCallback(() => {
    clearLongPressInterval()
    setProgress(0)
  }, [setProgress])
  const onStart = useCallback(() => {
    if (!(loading ?? disabled)) {
      intervalRef.current = setInterval(() => {
        setProgress(pipe(add(increment), min(threshold)))
      }, increment)
      setProgress(0)
    }
  }, [threshold, loading, disabled])
  const onComplete = useCallback(() => {
    clearLongPressInterval()
    setProgress(0)
    onFinish?.()
  }, [onFinish])
  const bind = useLongPress(onComplete, {
    threshold,
    onCancel,
    onStart
  })

  // clear the interval when unmounting
  useEffect(() => {
    return clearLongPressInterval
  }, [])

  return (
    <div className={clsx('w-max', 'h-max', 'relative')}>
      <button
        id={buttonId}
        className={clsx('btn', 'btn-size-alt', 'group', loading && 'animate-pulse')}
        disabled={loading ?? disabled}
        style={{
          background: `linear-gradient(to right, #BF0000 ${progressPercentage}%, #FF4040 ${progressPercentage}% 100%`
        }}
        {...bind()}
      >
        <span className={clsx('prose-label-lg', 'btn-label-cancel')}>{label}</span>
      </button>
      <Tooltip
        className={clsx('tooltip')}
        anchorSelect={`#${buttonId}`}
        delayHide={200}
        content={message}
        noArrow={true}
        hidden={loading ?? disabled}
        opacity={1}
        closeEvents={{ mouseleave: true, blur: true, click: true, dblclick: true, mouseup: true }}
      />
    </div>
  )
}
