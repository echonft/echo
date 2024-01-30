'use client'
import { isPathSecure } from '@echo/api/routing/is-path-secure'
import { linkProvider } from '@echo/api/routing/link-provider'
import { type AuthUser } from '@echo/model/types/auth-user'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { UserTagPictureButton } from '@echo/ui/components/user/tag/user-tag-picture-button'
import { WalletButton, type WalletButtonProps } from '@echo/ui/components/wallet/wallet-button'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { Menu, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import { type SignOutParams } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

export type DisconnectButtonProps = WalletButtonProps & {
  provider: {
    signOut: (options: SignOutParams<true> | undefined) => Promise<undefined>
  }
  user: AuthUser
  onSignOut?: VoidFunction
}

export const DisconnectButton: FunctionComponent<DisconnectButtonProps> = ({
  fetcher,
  provider,
  renderConnect,
  user,
  onSignOut
}) => {
  const t = useTranslations('layout.header.button')
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const callbackUrl = isPathSecure(pathname) ? '/' : pathname
  return (
    <div className={clsx('flex', 'flex-row', 'justify-center', 'gap-4', 'h-max', 'w-max')}>
      <Web3Provider>
        <WalletButton fetcher={fetcher} provider={provider} renderConnect={renderConnect} user={user} />
      </Web3Provider>
      <Menu as="div" className={clsx('relative', 'inline-block')}>
        <Menu.Button className={clsx('group', 'outline-none')}>
          <UserTagPictureButton user={user} />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className={clsx(
              'absolute',
              'right-0',
              'mt-2',
              'py-2',
              'rounded-lg',
              'bg-dark-500',
              'border',
              'border-dark-100',
              'w-36',
              'h-max',
              'z-10'
            )}
          >
            <Menu.Item>
              {({ close }) => (
                <InternalLink path={linkProvider.profile.items.get()} onClick={close}>
                  <button
                    disabled={loading}
                    className={clsx(
                      'prose-label-sm',
                      'text-white',
                      'px-2.5',
                      'py-1.5',
                      'bg-transparent',
                      'enabled:hover:bg-white/[0.08]',
                      'w-full',
                      'h-max',
                      'rounded-md',
                      'text-left'
                    )}
                  >
                    {t('profile.label')}
                  </button>
                </InternalLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ close }) => (
                <button
                  disabled={loading}
                  onClick={(event) => {
                    event.preventDefault()
                    setLoading(true)
                    provider
                      .signOut({ callbackUrl })
                      .then(() => {
                        onSignOut?.()
                      })
                      .catch(errorCallback({ tags: { action: 'signOut' } }))
                      .finally(() => {
                        setLoading(false)
                        close()
                      })
                  }}
                  className={clsx(
                    'prose-label-sm',
                    'text-white',
                    'px-2.5',
                    'py-1.5',
                    'bg-transparent',
                    'enabled:hover:bg-white/[0.08]',
                    'w-full',
                    'h-max',
                    'rounded-md',
                    'text-left',
                    loading && 'animate-pulse'
                  )}
                >
                  {loading ? t('disconnecting.label') : t('disconnect.label')}
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
