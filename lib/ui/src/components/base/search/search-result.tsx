import {
  SEARCH_RESULT_CATEGORY_COLLECTION,
  SEARCH_RESULT_CATEGORY_USER
} from '@echo/model/constants/search-result-category'
import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { PICTURE_SIZE_XS } from '@echo/ui/constants/picture-size'
import { clsx } from 'clsx'

export interface SearchResultProps<T> {
  result: SearchResultModel<T>
  style?: {
    rounded?: 'top' | 'bottom'
  }
  onSelect?: (selection: SearchResultModel<T>) => unknown
}

export const SearchResult = <T,>({ result, style, onSelect }: SearchResultProps<T>) => {
  const { label, pictureUrl } = result
  return (
    <button
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
      onClick={() => {
        onSelect?.(result)
      }}
    >
      <SizeableImage
        className={clsx('w-8', 'h-8', 'rounded')}
        src={pictureUrl}
        alt={label}
        width={PICTURE_SIZE_XS}
        height={PICTURE_SIZE_XS}
      />
      <span className={clsx('prose-label-md', 'text-white', 'truncate')}>{label}</span>
    </button>
  )
}
