import type { PageLayoutBackground } from '@echo/ui/types/page-layout-background'
import type { Nullable } from '@echo/utils/types/nullable'

export interface PageLayoutBackgroundPickerProps {
  onPageBackgroundUpdate?: (background: Nullable<PageLayoutBackground>) => void
}
