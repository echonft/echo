import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  title: string
  subtitle: string
}

export const HomeHeroLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, subtitle, children }) => {
  return (
    <PaddedContainer>
      <div className={classes('flex', 'flex-row', 'items-center', 'justify-between', 'gap-28', 'w-full', 'h-max')}>
        <div className={classes('flex', 'flex-col', 'w-max', 'h-max', 'gap-10')}>
          <h1
            className={classes(
              'text-[3rem]',
              'leading-[122%]',
              'tracking-[-0.045rem]',
              'capitalize',
              'whitespace-pre-line',
              'font-semibold',
              'font-inter',
              'text-white'
            )}
          >
            {title}
          </h1>
          <h2 className={classes('prose-header-md', 'text-white/70')}>{subtitle}</h2>
        </div>
        {children}
      </div>
    </PaddedContainer>
  )
}
