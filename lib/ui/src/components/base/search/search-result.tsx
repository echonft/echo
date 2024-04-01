import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import { PICTURE_SIZE_XS } from '@echo/ui/constants/picture-size'
import { Combobox } from '@headlessui/react'
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
    <Combobox.Option
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
        'hover:bg-white/[0.08]',
        style?.rounded === 'top' && 'rounded-t-lg',
        style?.rounded === 'bottom' && 'rounded-b-lg'
      )}
      value={result}
    >
      <Image
        className={clsx('w-8', 'h-8', 'rounded')}
        src={pictureUrl}
        alt={label}
        width={PICTURE_SIZE_XS}
        height={PICTURE_SIZE_XS}
        unoptimized={true}
        crossOrigin={'anonymous'}
      />
      <span className={clsx('prose-label-md', 'text-white', 'truncate')}>{label}</span>
    </Combobox.Option>
  )
}
