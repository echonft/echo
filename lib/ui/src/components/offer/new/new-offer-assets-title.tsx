import { SideCaretSvg } from '../base/svg/side-caret-svg'
import { DirectionLeft, DirectionRight } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  title: string
}

export const NewOfferAssetsTitle: FunctionComponent<Props> = ({ isReceiver, title }) => {
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
          'items-center'
        )}
      >
        <SideCaretSvg direction={isReceiver ? DirectionRight : DirectionLeft} />
      </span>
      <span className={clsx('prose-label-lg', 'text-white')}>{title}</span>
    </div>
  )
}
