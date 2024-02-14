'use client'
import { isPathSecure } from '@echo/api/routing/is-path-secure'
import { linkProvider } from '@echo/api/routing/link-provider'
import type { HeaderLoggedInProps } from '@echo/ui/components/base/header/header-logged-in'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { UserTagPictureButton } from '@echo/ui/components/user/tag/user-tag-picture-button'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { classes } from '@echo/ui/helpers/classes'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import { Menu, Transition } from '@headlessui/react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

export const DisconnectButton: FunctionComponent<HeaderLoggedInProps> = ({ user, onSignOut, onWalletButtonClick }) => {
  const t = useTranslations('layout.header.button')
  const { signOut } = useDependencies()
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const callbackUrl = isPathSecure(pathname) ? '/' : pathname
  return (
    <div className={classes('flex', 'flex-row', 'justify-center', 'gap-4', 'h-max', 'w-max')}>
      <ConnectWalletButton onClick={onWalletButtonClick} />
      <Menu as="div" className={classes('relative', 'inline-block')}>
        <Menu.Button className={classes('group', 'outline-none')}>
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
            className={classes(
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
                    className={classes(
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
                    {t('profile')}
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
                    signOut({ callbackUrl })
                      .then(() => {
                        onSignOut?.()
                      })
                      .catch(errorCallback({ tags: { action: 'signOut' } }))
                      .finally(() => {
                        setLoading(false)
                        close()
                      })
                  }}
                  className={classes(
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
                  {t(loading ? 'disconnecting' : 'disconnect')}
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
