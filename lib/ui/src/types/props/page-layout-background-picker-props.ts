import type { Background } from '@echo/ui/types/background'
import type { Nullable } from '@echo/utils/types/nullable'

export interface PageLayoutBackgroundPickerProps {
  onPageBackgroundUpdate?: (background: Nullable<Background>) => void
}
