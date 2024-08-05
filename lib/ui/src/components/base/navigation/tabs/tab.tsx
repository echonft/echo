'use client'
import { Tab as HeadlessTab } from '@headlessui/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import { forwardRef, type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  autoFocus?: boolean
  disabled?: boolean
}

const TabButton = forwardRef<HTMLButtonElement, PropsWithChildren>(function ({ children }, ref) {
  return (
    <button className={clsx('pill')} ref={ref}>
      <span className={clsx('prose-label-md', 'text-white', 'select-none')}>{children}</span>
    </button>
  )
})
TabButton.propTypes = {
  children: PropTypes.node
}
TabButton.displayName = TabButton.name

export const Tab: FunctionComponent<PropsWithChildren<Props>> = ({ autoFocus, disabled, children }) => {
  return (
    <HeadlessTab autoFocus={autoFocus} disabled={disabled} className={'tab'}>
      <span className={clsx('prose-label-md', 'text-white', 'select-none')}>{children}</span>
    </HeadlessTab>
  )
}
