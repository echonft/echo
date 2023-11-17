'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type AuthUser } from '@echo/model/types/auth-user'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { UserTag } from '@echo/ui/components/layout/header/user-tag'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { Menu, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  user: AuthUser
}

export const DisconnectButton: FunctionComponent<Props> = ({ user }) => {
  const t = useTranslations('layout.header.button')
  // const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  return (
    <Menu as="div" className={clsx('relative', 'inline-block', 'z-40')}>
      <Menu.Button>
        <UserTag user={user} />
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
          className={clsx('absolute', 'right-0', 'mt-2', 'py-2', 'rounded-lg', 'bg-white/[0.08]', 'w-36', 'h-max')}
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
                    'hover:bg-white/[0.08]',
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
                onClick={() => {
                  setLoading(true)
                  signOut()
                    .catch(errorCallback({ tags: { action: 'signOut' } }))
                    .finally(() => {
                      setLoading(false)
                      close()
                      // TODO check if we need to redirect
                    })
                }}
                className={clsx(
                  'prose-label-sm',
                  'text-white',
                  'px-2.5',
                  'py-1.5',
                  'bg-transparent',
                  'hover:bg-white/[0.08]',
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
  )
}
