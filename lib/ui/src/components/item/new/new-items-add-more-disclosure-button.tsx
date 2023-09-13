import { AddIconSvg } from '@echo/ui/components/base/svg/add-icon-svg'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  title: string
  onClick?: MouseEventHandler
}

export const NewItemsAddMoreDisclosureButton: FunctionComponent<Props> = ({ title, onClick }) => {
  return (
    <Disclosure.Button
      as={'div'}
      onClick={onClick}
      className={clsx(
        'flex',
        'flex-col',
        'rounded-2xl',
        'min-h-full',
        'w-32',
        'gap-2',
        'border',
        'border-dashed',
        'border-white/30',
        'justify-center',
        'items-center',
        'cursor-pointer'
      )}
    >
      <span className={clsx('bg-yellow-500', 'rounded-lg', 'p-2', 'text-black')}>
        <AddIconSvg />
      </span>
      <span className={clsx('prose-label-sm', 'text-white')}>{title}</span>
    </Disclosure.Button>
  )
}
