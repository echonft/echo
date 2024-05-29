'use client'
import { SearchIconSvg } from '@echo/ui/components/base/svg/search-icon-svg'
import { theme } from '@echo/ui/helpers/theme/theme'
import type { Nullable } from '@echo/utils/types/nullable'
import { ComboboxInput } from '@headlessui/react'
import { clsx } from 'clsx'
import { always, identity, ifElse, isEmpty, isNil } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { debounce } from 'throttle-debounce'

interface Props {
  query: Nullable<string>
  searching?: boolean
  style?: Nullable<{
    placeHolder?: string
  }>
  onChange?: (query: Nullable<string>) => void
  onSearch?: (searchQuery: string) => unknown
}

// TODO fix clear button
export const SearchInput: FunctionComponent<Props> = ({ query, searching, style, onChange, onSearch }) => {
  const search = useMemo(
    () =>
      debounce(
        800,
        (searchQuery: string) => {
          if (!isEmpty(searchQuery)) {
            onSearch?.(searchQuery)
          }
        },
        { atBegin: false }
      ),
    [onSearch]
  )

  return (
    <div className={clsx('items-center', 'bg-dark-400', 'rounded-lg', 'w-full')}>
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
      {/*<AnimatePresence>*/}
      {/*  <SearchInputClearButton*/}
      {/*    show={!isNilOrEmpty(query)}*/}
      {/*    onClick={() => {*/}
      {/*      onChange?.(undefined)*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</AnimatePresence>*/}
      <ComboboxInput
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
        value={ifElse(isNil, always(''), identity)(query)}
        placeholder={style?.placeHolder}
        onChange={(event) => {
          const value = event.target.value
          onChange?.(value)
          search(value)
        }}
      />
    </div>
  )
}
