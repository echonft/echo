'use client'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { DIRECTION_RIGHT } from '@echo/ui/constants/direction'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  disabled?: boolean
  onClick?: VoidFunction
}

export const LoginFlowContinueButton: FunctionComponent<Props> = ({ disabled = false, onClick }) => {
  const t = useTranslations('auth.continueBtn')
  return (
    <button className={clsx('group', 'btn', 'gap-8')} onClick={onClick} disabled={disabled}>
      <span
        className={clsx(
          'text-paragraph-sm',
          '!text-[0.9375rem]',
          'text-neutral-100',
          'group-enabled:group-hover:text-white'
        )}
      >
        {t('label')}
      </span>
      <span className={clsx('text-neutral-100', 'group-enabled:group-hover:text-white')}>
        <SideCaretSvg direction={DIRECTION_RIGHT} />
      </span>
    </button>
  )
}
