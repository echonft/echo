import { Tag } from '@echo/frontend/components/tag'
import { SearchableObject } from '@echo/frontend/lib/view-models/object'
import clsx from 'clsx'
import React from 'react'

interface Props<T> {
  tags: SearchableObject<T>[]
  onRemoveTag: (removedTag: SearchableObject<T>) => void
}

export const TagManager = <T extends any>({ tags, onRemoveTag }: Props<T>) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2')}>
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag} onRemoveTag={onRemoveTag} />
      ))}
    </div>
  )
}
