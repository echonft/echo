import { OfferCardsContainerSkeleton } from '@echo/ui/components/offer/card/layout/skeleton/offer-cards-container-skeleton'
import { CollectionNavigationLayoutSkeleton } from '@echo/ui/pages/collection/navigation/collection-navigation-layout-skeleton'

export default function render() {
  return (
    <CollectionNavigationLayoutSkeleton>
      <OfferCardsContainerSkeleton />
    </CollectionNavigationLayoutSkeleton>
  )
}
