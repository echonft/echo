import { SearchResultCategory } from '@echo/model/constants/search-result-category'
import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { PictureSize } from '@echo/utils/constants/picture-size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export interface SearchResultProps {
  result: SearchResultModel
  options?: {
    rounded?: 'top' | 'bottom'
  }
  onSelect?: (selection: SearchResultModel) => void
}

export const SearchResult: FunctionComponent<SearchResultProps> = ({ result, options, onSelect }) => {
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
        result.category === SearchResultCategory.Collection && 'from-yellow-500/40',
        result.category === SearchResultCategory.User && 'from-purple-500/40',
        'to-transparent',
        options?.rounded === 'top' && 'rounded-t-lg',
        options?.rounded === 'bottom' && 'rounded-b-lg'
      )}
      onClick={() => {
        onSelect?.(result)
      }}
    >
      <SizeableImage
        className={clsx('w-8', 'h-8', 'rounded')}
        src={pictureUrl}
        alt={label}
        width={PictureSize.SM}
        height={PictureSize.SM}
      />
      <span className={clsx('prose-label-md', 'text-white', 'truncate')}>{label}</span>
    </button>
  )
}
