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
    empty: {
      listings: {
        message: 'There is currently no active listing for this collection',
        btn: {
          label: 'Create listing'
        }
      },
      swaps: {
        message: 'No swap has been done for this collection yet',
        btn: {
          label: 'Create listing'
        }
      }
    },
    filters: {
      traits: {
        button: {
          title: '{trait}{count, plural, =0 {} other { (# selected)}}'
        },
        title: 'Attributes'
      }
    },
    thumbnail: {
      title: 'Any {collectionName}'
    }
  },
  errorPage: {
    title: 'Something went wrong',
    button: {
      label: 'Go home'
    }
  },
  items: {
    new: {
      assetsInTitle: 'Going in',
      assetsOutTitle: 'Going out',
      addMoreBtn: 'Add more',
      noItemsTitle: 'No NFTs selected yet',
      noItemsBtn: 'Select NFTs now'
    }
  },
  layout: {
    header: {
      connectButton: 'Connect',
      searchInput: 'Search for a collection or a user'
    }
  },
  listing: {
    details: {
      expiresAt: 'Expires in',
      expiredAt: 'Expired',
      assets: {
        title: {
          in: 'Interested in',
          out: 'Offering'
        }
      }
    },
    new: {
      bottomSlider: {
        title: 'Listing overview',
        searchPlaceholder: 'Search by collection name',
        addCollectionBtn: 'Collection',
        itemsCount: '{count} {count, plural, =0 {} =1 {item} other {items}}',
        finalizeBtn: 'Finalize',
        dismissBtn: 'Dismiss',
        expirationTitle: 'Expires in',
        expirationSubtitle: 'During beta, the expiration is locked to 7 days',
        expirationValue: '7 days',
        emptySearch: 'No collections found'
      }
    }
  },
  navigation: {
    items: 'Items',
    listings: 'Listings',
    swaps: 'Swaps'
  },
  nft: {
    details: {
      attributes: {
        title: 'Attributes'
      },
      makeOfferBtn: 'Make an offer',
      listings: {
        title: 'Latest listings',
        empty: 'No listings posted yet',
        by: 'By',
        expiresIn: 'Expires in {time}'
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
    new: {
      bottomSlider: {
        title: 'Offer overview',
        finalize: 'Finalize offer',
        noNftsTitle: 'No NFTs selected yet',
        noNftsBtn: 'Select NFTs now'
      },
      confirmationModal: {
        title: 'Confirm Offer',
        assetsInSubtitle: 'Your {count, plural, =0 {} =1 {asset} other {assets}}',
        assetsOutSubtitle: "Counterparty's {count, plural, =0 {} =1 {asset} other {assets}}",
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
  shared: {
    assets: {
      in: 'Going in',
      out: 'Going out'
    }
  },
  user: {
    button: {
      makeOffer: {
        label: 'Make an offer'
      }
    },
    empty: {
      items: {
        message: 'This user does not own any NFT'
      },
      listings: {
        message: 'This user does not have any active listing',
        btn: {
          label: 'Make an offer'
        }
      },
      swaps: {
        message: 'This user has not made any swap',
        btn: {
          label: 'Make an offer'
        }
      }
    },
    filters: {
      collection: {
        title: 'Collections'
      }
    }
  }
}
