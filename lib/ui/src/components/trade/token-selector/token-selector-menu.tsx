import type { Erc20Token } from '@echo/model/types/token'
import { DownCaretSvg } from '@echo/ui/components/base/svg/down-caret-svg'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { clsx } from 'clsx'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  selectedToken: Erc20Token
  tokens: Erc20Token[]
  onTokenChanged?: (token: Erc20Token) => unknown
}

export const TokenSelectorMenu: FunctionComponent<Props> = ({ selectedToken, tokens, onTokenChanged }) => {
  return (
    <Menu>
      <MenuButton
        className={clsx(
          'flex',
          'flex-row',
          'items-center',
          'justify-center',
          'gap-1.5',
          'bg-transparent',
          'rounded-lg',
          'border',
          'border-white/[0.08]',
          'py-2',
          'px-2.5',
          'w-20',
          'h-9',
          'prose-label-xs-semi',
          'text-white',
          'outline-none'
        )}
      >
        {selectedToken.name}
        <DownCaretSvg />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className={clsx(
          'w-[var(--button-width)]',
          'origin-top',
          'rounded-lg',
          'bg-dark-450',
          'p-1.5',
          'transition',
          'duration-150',
          'ease-out',
          '[--anchor-gap:var(--spacing-1)]',
          'focus:outline-none',
          'data-[closed]:scale-95',
          'data-[closed]:opacity-0'
        )}
      >
        {map(
          (token) => (
            <MenuItem key={token.contract}>
              <button
                className={clsx(
                  'flex',
                  'w-full',
                  'px-2.5',
                  'py-1',
                  'rounded',
                  'prose-label-xs-semi',
                  'text-white',
                  selectedToken == token ? 'bg-white/[0.08]' : 'bg-transparent',
                  selectedToken != token && 'hover:bg-white/5'
                )}
                onClick={() => onTokenChanged?.(token)}
              >
                {token.name}
              </button>
            </MenuItem>
          ),
          tokens
        )}
      </MenuItems>
    </Menu>
  )
}
