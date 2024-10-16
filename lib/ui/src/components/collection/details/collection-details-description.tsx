'use client'
import type { Collection } from '@echo/model/types/collection/collection'
import { ExternalLink } from '@echo/ui/components/base/external-link'
import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
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
    <PaddedLayout>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full')}>
        <div className={clsx('prose-label-md-semi', 'text-white/60', 'w-[37rem]')}>
          <Markdown renderer={renderer} value={description ?? undefined} />
        </div>
      </div>
    </PaddedLayout>
  )
}
