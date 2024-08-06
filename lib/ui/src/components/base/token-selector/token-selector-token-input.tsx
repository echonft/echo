import { DownCaretSvg } from '@echo/ui/components/base/svg/down-caret-svg'
import { defaultERC20Token } from '@echo/web3-dom/constants/supported-erc20-tokens'
import type { ERC20Token } from '@echo/web3-dom/types/erc20-token'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { clsx } from 'clsx'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  tokens: ERC20Token[]
  onTokenChanged?: (token: ERC20Token) => unknown
  selectedToken?: ERC20Token
}

export const TokenSelectorTokenInput: FunctionComponent<Props> = ({
  onTokenChanged,
  selectedToken = defaultERC20Token,
  tokens
}) => {
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
          'border-white/50',
          'py-2',
          'px-2.5',
          'w-20',
          'h-9',
          'prose-label-xs-semi',
          'text-white'
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
                  'hover:bg-white/5'
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
