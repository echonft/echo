import { BackButton } from '@echo/ui/components/base/back-button'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  title?: string
  onBack?: VoidFunction
  path?: string
}

export const BackButtonLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, onBack, path, children }) => {
  return (
    <div className={classes('flex', 'flex-col')}>
      <div className={classes('px-6', 'py-3')}>
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
      <div className={classes('py-4')}>{children}</div>
    </div>
  )
}
