import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { DIRECTION_LEFT } from '@echo/ui/constants/direction'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  title?: string
  disabled?: boolean
  onBack?: VoidFunction
}

const BackButtonTitle: FunctionComponent<Pick<Props, 'title'>> = ({ title }) => {
  if (isNilOrEmpty(title)) {
    return null
  }
  return <span className={clsx('btn-label-secondary', 'prose-paragraph-sm', '!text-[0.9375rem]')}>{title}</span>
}

export const BackButton: FunctionComponent<Props> = ({ title, disabled = false, onBack }) => {
  return (
    <button
      className={clsx('btn', 'group', 'gap-4', '!justify-start', 'pb-[3.12rem]')}
      disabled={disabled}
      onClick={onBack}
    >
      <span className={clsx('btn-label-secondary')}>
        <SideCaretSvg direction={DIRECTION_LEFT} width={12} height={20} />
      </span>
      <BackButtonTitle title={title} />
    </button>
  )
}
