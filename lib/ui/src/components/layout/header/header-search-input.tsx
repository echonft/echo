import { SearchIconSvg } from '../../base/svg/search-icon-svg'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { ChangeEvent, FunctionComponent } from 'react'

export interface HeaderSearchInputProps {
  onChange?: (query: string) => never
}

export const HeaderSearchInput: FunctionComponent<HeaderSearchInputProps> = ({ onChange }) => {
  const t = useTranslations()
  return (
    <Combobox className={clsx('relative')} as={'div'} name="assignee" defaultValue={''}>
      <SearchIconSvg
        className={clsx('absolute', 'top-1.5', 'left-3', 'z-10', 'text-yellow-500')}
        width={16}
        height={16}
      />
      <Combobox.Input
        className={clsx(
          'bg-white/[0.08]',
          'rounded-lg',
          'py-1.5',
          'pl-10',
          'pr-4',
          'w-[37rem]',
          'prose-label-xs-bold',
          'focus-visible:outline',
          'focus-visible:outline-1',
          'focus-visible:outline-yellow-500'
        )}
        onChange={(event: ChangeEvent<HTMLInputElement> & { target: { value: string } }) => {
          onChange?.(event.target.value)
        }}
        placeholder={t('layout.header.searchInput')}
      />
    </Combobox>
  )
}
