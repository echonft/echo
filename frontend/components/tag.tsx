import { SearchableObject } from '@echo/frontend/lib/view-models/object'
import clsx from 'clsx'
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface Props<T> {
  tag: SearchableObject<T>
  onRemoveTag: (removedTag: SearchableObject<T>) => void
}

export const Tag = <T extends any>({ tag, onRemoveTag }: Props<T>) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2', 'bg-green-500', 'rounded', 'p-2')}>
      <span>{tag.label}</span>
      <button onClick={() => onRemoveTag(tag)}>
        <AiOutlineCloseCircle />
      </button>
    </div>
  )
}
