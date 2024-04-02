'use client'
import { SearchInputClearButton } from '@echo/ui/components/base/search/search-input-clear-button'
import { SearchIconSvg } from '@echo/ui/components/base/svg/search-icon-svg'
import { theme } from '@echo/ui/helpers/theme/theme'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { Combobox, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { always, identity, ifElse, isEmpty, isNil } from 'ramda'
import { type FocusEventHandler, type ForwardedRef, forwardRef, useMemo } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { debounce } from 'throttle-debounce'

interface Props {
  query: Nullable<string>
  searching?: boolean
  style?: Nullable<{
    placeHolder?: string
  }>
  onBlur?: FocusEventHandler
  onChange?: (query: Nullable<string>) => void
  onSearch?: (searchQuery: string) => unknown
}

function Render(props: Props, ref: ForwardedRef<HTMLInputElement>) {
  const { query, searching, style, onBlur, onChange, onSearch } = props
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
    <Combobox.Button as={'div'} className={clsx('items-center', 'bg-dark-400', 'rounded-lg', 'w-full')}>
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
      <Transition
        show={!isNilOrEmpty(query)}
        enter={'transition ease-in duration-100'}
        enterFrom={'opacity-0'}
        enterTo={'opacity-100'}
        leave={'transition ease-in duration-100'}
        leaveFrom={'opacity-100'}
        leaveTo={'opacity-0'}
      >
        <SearchInputClearButton
          className={clsx('absolute', 'right-3', 'top-3')}
          onClick={() => {
            onChange?.(undefined)
          }}
        />
      </Transition>
      <input
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
        ref={ref}
        onChange={(event) => {
          const value = event.target.value
          onChange?.(value)
          search(value)
        }}
        onBlur={(event) => {
          onBlur?.(event)
        }}
      />
    </Combobox.Button>
  )
}

export const SearchInput = forwardRef(Render)
