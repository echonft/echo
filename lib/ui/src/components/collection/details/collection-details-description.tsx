'use client'
import type { Collection } from '@echo/model/types/collection'
import { ExternalLink } from '@echo/ui/components/base/external-link'
import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { clsx } from 'clsx'
import Markdown from 'marked-react'
import type { FunctionComponent, ReactNode } from 'react'

const renderer = {
  link(href: string, text: ReactNode) {
    return (
      <ExternalLink href={href} style={{ inline: true }} key={href}>
        <span className={clsx('inline', 'text-yellow-500')}>{text}</span>
      </ExternalLink>
    )
  }
}
export const CollectionDetailsDescription: FunctionComponent<Pick<Collection, 'description'>> = ({ description }) => {
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-8')}>
        <div className={clsx('prose-header-xs', 'text-white/60', 'w-[37rem]')}>
          <Markdown renderer={renderer} value={description ?? undefined} />
        </div>
      </div>
    </PaddedContainer>
  )
}
