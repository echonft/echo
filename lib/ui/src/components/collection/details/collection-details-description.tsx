'use client'
import type { Collection } from '@echo/model/types/collection'
import { ExternalLink } from '@echo/ui/components/base/external-link'
import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { classes } from '@echo/ui/helpers/classes'
import Markdown from 'marked-react'
import type { FunctionComponent, ReactNode } from 'react'

const renderer = {
  link(href: string, text: ReactNode) {
    return (
      <ExternalLink href={href} style={{ inline: true }}>
        <div className={classes('inline', 'text-yellow-500')}>{text}</div>
      </ExternalLink>
    )
  }
}
export const CollectionDetailsDescription: FunctionComponent<Pick<Collection, 'description'>> = ({ description }) => {
  return (
    <PaddedContainer>
      <div className={classes('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-8')}>
        <div className={classes('prose-header-xs', 'text-white/60', 'w-[37rem]')}>
          <Markdown renderer={renderer} value={description} />
        </div>
      </div>
    </PaddedContainer>
  )
}
