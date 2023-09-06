import { SideCaretSvg } from '../base/svg/side-caret-svg'
import { DirectionLeft, DirectionRight } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
}

export const NewItemsTitle: FunctionComponent<Props> = ({ isReceiver }) => {
  const t = useTranslations('items.new')

  return (
    <div className={clsx('flex', 'gap-2', 'items-center')}>
      <span
        className={clsx(
          'w-6',
          'h-6',
          isReceiver ? 'bg-green-500' : 'bg-red-500',
          'rounded-lg',
          'flex',
          'justify-center',
          'items-center',
          'text-dark-500'
        )}
      >
        <SideCaretSvg direction={isReceiver ? DirectionRight : DirectionLeft} />
      </span>
      <span className={clsx('prose-label-lg', 'text-white')}>{t(isReceiver ? 'assetsInTitle' : 'assetsOutTitle')}</span>
    </div>
  )
}
