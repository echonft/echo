import {
  SEARCH_RESULT_CATEGORY_COLLECTION,
  SEARCH_RESULT_CATEGORY_USER
} from '@echo/model/constants/search-result-category'
import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import { PICTURE_SIZE_XS } from '@echo/ui/constants/picture-size'
import { ComboboxOption } from '@headlessui/react'
import { clsx } from 'clsx'
import Image from 'next/image'

export interface SearchResultProps<T> {
  result: SearchResultModel<T>
  style?: {
    rounded?: 'top' | 'bottom'
  }
}

export const SearchResult = <T,>({ result, style }: SearchResultProps<T>) => {
  const { label, pictureUrl } = result
  return (
    <ComboboxOption
      as={'button'}
      className={clsx(
        'flex',
        'flex-row',
        'w-full',
        'h-max',
        'px-4.5',
        'py-4',
        'items-center',
        'gap-2.5',
        'hover:bg-gradient-to-r',
        result.category === SEARCH_RESULT_CATEGORY_COLLECTION && 'from-yellow-500/40',
        result.category === SEARCH_RESULT_CATEGORY_USER && 'from-purple-500/40',
        'to-transparent',
        style?.rounded === 'top' && 'rounded-t-lg',
        style?.rounded === 'bottom' && 'rounded-b-lg'
      )}
      value={result}
      id={`search-result-${result.id}`}
    >
      <Image
        className={clsx('w-8', 'h-8', 'rounded')}
        src={pictureUrl}
        alt={label}
        width={PICTURE_SIZE_XS}
        height={PICTURE_SIZE_XS}
        unoptimized={true}
      />
      <span className={clsx('prose-label-md', 'text-white', 'truncate')}>{label}</span>
    </ComboboxOption>
  )
}
