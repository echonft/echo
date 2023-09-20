import { UserTag } from '@echo/ui/components/layout/header/user-tag'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import { Menu, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const DisconnectButton: FunctionComponent<Props> = ({ user }) => {
  const t = useTranslations('layout.header.button')
  return (
    <Menu as="div" className={clsx('relative', 'inline-block')}>
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
              <button
                onClick={() => {
                  signOut()
                    .then(close)
                    .catch((e) => {
                      logger.error(`sign out error: ${errorMessage(e)}`)
                      close()
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
                  'text-left'
                )}
              >
                {t('disconnect.label')}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
