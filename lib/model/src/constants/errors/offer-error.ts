export enum OfferError {
  Exists = 'offer already exists',
  InvalidState = 'invalid offer state',
  Locked = 'offer is locked',
  NotFound = 'offer does not exist',
  ThreadNotFound = 'offer thread does not exist',
  UpdatePostExists = 'offer update post already exists'
}
