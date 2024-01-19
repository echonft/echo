import { BackButton } from '@echo/ui/components/base/back-button'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  title?: string
  onBack?: VoidFunction
  path?: string
}

export const BackButtonLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, onBack, path, children }) => {
  return (
    <div className={clsx('flex', 'flex-col')}>
      <div className={clsx('px-6', 'py-3')}>
        <HideIfNil
          checks={path}
          render={(path) => (
            <InternalLink path={path}>
              <BackButton onBack={onBack} title={title} />
            </InternalLink>
          )}
        />
        <ShowIfNil checks={path}>
          <BackButton onBack={onBack} title={title} />
        </ShowIfNil>
      </div>
      <div className={clsx('py-4')}>{children}</div>
    </div>
  )
}
