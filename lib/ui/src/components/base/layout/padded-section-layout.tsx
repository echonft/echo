import { useBackground } from '@echo/ui/hooks/use-background'
import type { Background } from '@echo/ui/types/background'
import { clsx } from 'clsx'
import { pick } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  background?: Background
}

export const PaddedSectionLayout: FunctionComponent<PropsWithChildren<Props>> = ({ background, children }) => {
  const bgProps = useBackground(background)
  return (
    <div className={clsx('w-full', 'px-16', 'pt-24', bgProps.className)} {...pick(['style'], bgProps)}>
      {children}
    </div>
  )
}
