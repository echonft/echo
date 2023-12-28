'use client'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { DIRECTION_RIGHT } from '@echo/ui/constants/direction'
import clsx from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  label: string
  disabled?: boolean
  onClick?: VoidFunction
}

export const LoginFlowContinueButton: FunctionComponent<Props> = ({ label, disabled = false, onClick }) => {
  return (
    <button className={clsx('group', 'btn', 'gap-8')} onClick={onClick} disabled={disabled}>
      <span
        className={clsx(
          'prose-paragraph-sm',
          '!text-[0.9375rem]',
          'text-neutral-100',
          'group-enabled:group-hover:text-white'
        )}
      >
        {label}
      </span>
      <span className={clsx('text-neutral-100', 'group-enabled:group-hover:text-white')}>
        <SideCaretSvg direction={DIRECTION_RIGHT} />
      </span>
    </button>
  )
}
