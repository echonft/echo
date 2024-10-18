'use client'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { Direction } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  label: string
  disabled?: boolean
  onClick?: MouseEventHandler
}

export const LoginContinueButton: FunctionComponent<Props> = ({ label, disabled, onClick }) => {
  return (
    <button
      className={clsx('group', 'btn', 'gap-8', 'pr-2', 'pl-8', 'py-2.5', 'enabled:hover:bg-white/[0.08]')}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={clsx('btn-label-secondary', 'prose-paragraph-sm', '!text-[0.9375rem]')}>{label}</span>
      <span className={clsx('btn-label-secondary')}>
        <SideCaretSvg direction={Direction.Right} />
      </span>
    </button>
  )
}
