'use client'
import { SearchIconSvg } from '@echo/ui/components/base/svg/search-icon-svg'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type ChangeEvent, type FunctionComponent } from 'react'

interface Props {
  onChange?: (query: string) => never
}

export const HeaderSearchInput: FunctionComponent<Props> = ({ onChange }) => {
  const t = useTranslations('layout.header')
  return (
    <Combobox
      className={clsx('relative', 'w-full', 'h-[1.875rem]', 'flex', 'flex-row', 'items-center')}
      as={'div'}
      defaultValue={''}
    >
      <SearchIconSvg
        className={clsx('absolute', 'top-[0.4375rem]', 'left-3', 'z-10', 'text-yellow-500')}
        width={16}
        height={16}
      />
      <Combobox.Input
        className={clsx(
          'bg-white/[0.08]',
          'rounded-lg',
          'pl-10',
          'pr-4',
          'h-full',
          'w-full',
          'prose-label-xs-semi',
          'focus-visible:outline-0',
          'focus-visible:bg-white/50',
          'focus-visible:text-dark-300',
          'focus-visible:placeholder:text-dark-300'
        )}
        onChange={(event: ChangeEvent<HTMLInputElement> & { target: { value: string } }) => {
          onChange?.(event.target.value)
        }}
        placeholder={t('searchInput')}
      />
    </Combobox>
  )
}
