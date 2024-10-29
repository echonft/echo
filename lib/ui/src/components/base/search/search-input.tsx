'use client'
import { SearchInputClearButton } from '@echo/ui/components/base/search/search-input-clear-button'
import { SearchIconSvg } from '@echo/ui/components/base/svg/search-icon-svg'
import { theme } from '@echo/ui/helpers/theme/theme'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { Input } from '@headlessui/react'
import { clsx } from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { defaultTo, isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'
import { RotatingLines } from 'react-loader-spinner'

interface Props {
  query: Nullable<string>
  searching?: boolean
  style?: Nullable<{
    placeHolder?: string
    backgroundColor?: string
  }>
  onChange?: (query: Nullable<string>) => void
}

export const SearchInput: FunctionComponent<Props> = ({ query, searching, style, onChange }) => {
  return (
    <div className={clsx('items-center', style?.backgroundColor ?? 'bg-dark-350', 'rounded-lg', 'w-full')}>
      <span className={clsx('text-yellow-500', 'absolute', 'left-3', 'top-3')}>
        {searching ? (
          <RotatingLines
            strokeColor={theme.colors.yellow['500']}
            strokeWidth="5"
            animationDuration="0.75"
            width="24"
            visible={true}
          />
        ) : (
          <SearchIconSvg width={24} height={24} />
        )}
      </span>
      <AnimatePresence>
        <SearchInputClearButton
          show={!isNilOrEmpty(query)}
          onClick={() => {
            onChange?.(undefined)
          }}
        />
      </AnimatePresence>
      <Input
        className={clsx(
          'h-12',
          'px-14',
          'w-full',
          'rounded-lg',
          'prose-label-lg',
          'text-white',
          'bg-transparent',
          'outline-none'
        )}
        value={defaultTo('', query)}
        placeholder={style?.placeHolder}
        onChange={(event) => {
          onChange?.(event.target.value)
        }}
        onKeyDown={(event) => {
          if (isEmpty(query) && event.key === 'Backspace') {
            onChange?.(undefined)
          }
        }}
      />
    </div>
  )
}
