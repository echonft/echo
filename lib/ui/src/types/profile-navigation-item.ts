import {
  NavigationItems,
  NavigationListingsCreated,
  NavigationListingsReceived,
  NavigationOffersCreated,
  NavigationOffersReceived,
  NavigationSwaps
} from '../constants/navigation-item'

export type ProfileNavigationItem =
  | typeof NavigationItems
  | typeof NavigationListingsCreated
  | typeof NavigationListingsReceived
  | typeof NavigationOffersCreated
  | typeof NavigationOffersReceived
  | typeof NavigationSwaps
