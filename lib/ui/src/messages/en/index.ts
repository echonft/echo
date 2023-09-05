export const messages = {
  collection: {
    button: {
      makeOffer: {
        label: 'Make an offer'
      }
    },
    details: {
      size: '{size, number, ::K} NFTs'
    },
    filters: {
      traits: {
        button: {
          title: '{trait}{count, plural, =0 {} other { (# selected)}}'
        },
        title: 'Attributes'
      }
    },
    navigation: {
      items: 'Items',
      listings: 'Listings',
      swaps: 'Swaps'
    }
  },
  layout: {
    header: {
      connectButton: 'Connect',
      searchInput: 'Search for a collection or a user'
    }
  },
  errorPage: {
    title: 'Something went wrong',
    button: {
      label: 'Go home'
    }
  },
  nft: {
    details: {
      attributes: {
        title: 'Attributes'
      },
      makeOfferBtn: 'Make an offer',
      offers: {
        title: 'Latest offers',
        empty: 'No offers made yet',
        by: 'By',
        expiresIn: 'Expires {time}'
      },
      tokenDetails: {
        title: 'Token Details',
        tokenId: 'Token ID',
        blockchain: 'Blockchain',
        tokenType: 'Token Standard'
      }
    },
    thumbnail: {
      makeOfferBtn: 'Make an offer'
    }
  },
  notFoundPage: {
    title: 'Sorry, there’s<br></br>nothing here',
    button: {
      label: 'Go home'
    }
  },
  offer: {
    state: {
      OPEN: 'Pending',
      ACCEPTED: 'Accepted',
      CANCELLED: 'Cancelled',
      COMPLETED: 'Completed',
      REJECTED: 'Rejected',
      INVALID: 'Invalid'
    },
    details: {
      expiresAt: 'Expires in',
      expiredAt: 'Expired',
      acceptBtn: 'Accept',
      cancelBtn: 'Cancel',
      rejectBtn: 'Reject',
      approveBtn: 'Approve {count, plural, =0 {} =1 {NFT} other {NFTs}}',
      completeBtn: 'Execute Swap',
      actionModal: {
        ACCEPTED: {
          title: 'Offer accepted',
          subtitle: 'You have successfully accepted the offer',
          confirmBtn: 'Confirm',
          copyLinkBtn: 'Copy Link'
        },
        CANCELLED: {
          title: 'Offer cancelled',
          subtitle: 'You have successfully cancelled the offer',
          dismissBtn: 'Dismiss'
        },
        REJECTED: {
          title: 'Offer rejected',
          subtitle: 'You have successfully rejected the offer',
          dismissBtn: 'Dismiss'
        }
      }
    },
    misc: {
      assetsInSubtitle: 'Your {count, plural, =0 {} =1 {asset} other {assets}}',
      assetsInTitle: 'Going in',
      assetsOutSubtitle: "Counterparty's {count, plural, =0 {} =1 {asset} other {assets}}",
      assetsOutTitle: 'Going out'
    },
    new: {
      bottomSlider: {
        title: 'Offer overview',
        add: 'Add more',
        finalize: 'Finalize offer',
        noNftsTitle: 'No NFTs selected yet',
        noNftsBtn: 'Select NFTs now'
      },
      confirmationModal: {
        title: 'Confirm Offer',
        confirmBtn: 'Confirm',
        editBtn: 'Edit'
      },
      confirmedModal: {
        title: 'Offer successfully created',
        subtitle: 'Your offer was successfully created, now you can contact your counterparty',
        confirmBtn: 'Confirm',
        copyLinkBtn: 'Copy link'
      }
    }
  },
  user: {
    button: {
      makeOffer: {
        label: 'Make an offer'
      }
    },
    filters: {
      collection: {
        title: 'Collections'
      }
    }
  }
}
