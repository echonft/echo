export enum Routes {
  OFFER = 'offer',
  USER = 'user'
}

export interface RouteParams {
  id?: string
}

export interface LinkProvider {
  getLink: (route: Routes, params?: RouteParams) => string
}
