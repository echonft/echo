export const messages = {
  assets: {
    in: 'Going in',
    out: 'Going out'
  },
  auth: {
    step0: {
      title: 'Link your Discord',
      subtitle: 'Start by linking your Discord profile to Echo!',
      loginBtn: {
        label: 'Link Discord'
      },
      continueBtn: {
        label: 'Continue'
      }
    },
    step1: {
      title: 'Hey there {username}!',
      subtitle:
        'If you have come this far it is because you want to be part of the future of NFT swapping, get ready to live the Echo experience and transform the Web3 space with us!',
      btn: {
        label: 'Join our Discord Now!'
      },
      continueBtn: {
        label: 'Skip'
      }
    },
    step2: {
      title: 'Connect your wallet',
      subtitle: 'Connect your wallet to start swapping',
      continueBtn: {
        label: {
          connected: 'Continue',
          disconnected: 'Skip'
        }
      }
    }
  },
  collection: {
    button: {
      createOffer: 'Make an offer',
      createListing: 'Create listing'
    },
    details: {
      size: '{size, number, ::K} NFTs'
    },
    empty: {
      items: {
        message: 'There is no NFT for this collection'
      },
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
    navigation: {
      items: 'Items',
      listings: 'Listings',
      swaps: 'Swaps'
    },
    thumbnail: {
      title: '{count} {collectionName}'
    },
    tile: {
      swapsCount: '{count, plural, =0 {No Swap} =1 {1 Swap} other {{count} Swaps}}'
    }
  },
  error: {
    listing: {
      cancel: 'An error occurred while trying to cancel the listing. Please try again',
      new: 'An error occurred while trying to create the listing. Please try again'
    },
    offer: {
      accept: 'An error occurred while trying to accept the offer. Please try again',
      cancel: 'An error occurred while trying to cancel the offer. Please try again',
      new: 'An error occurred while trying to create the offer. Please try again',
      reject: 'An error occurred while trying to reject the offer. Please try again',
      swap: 'An error occurred while trying to swap the assets. Please try again'
    },
    profile: {
      addWallet: 'An error occurred while trying to add the wallet to your account. Please try again',
      signing: 'An error occurred while trying to sign the message. Please try again'
    }
  },
  errorPage: {
    title: 'Something went wrong',
    homeBtn: 'Take me home',
    resetBtn: 'Try again'
  },
  home: {
    title: 'OTC trade your NFTs\nin the safest way',
    subtitle: 'Revolutionizing NFT Swapping and Communication!',
    discord: {
      title: 'Join our community and start\nswapping now',
      btn: 'Join our discord'
    },
    recentSwaps: {
      title: 'Recent swaps'
    },
    rankedCollections: {
      btn: 'Explore all',
      collection: 'Collection',
      rank: 'Rank',
      swapsCount: '# Swaps'
    },
    topCollections: {
      title: 'Top collections'
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
      button: {
        disconnect: {
          label: 'Logout'
        },
        disconnecting: {
          label: 'Logging out...'
        },
        profile: {
          label: 'Profile'
        }
      },
      searchInput: 'Search for a collection or a user'
    }
  },
  listing: {
    assets: {
      in: 'Looking for',
      out: 'Offering'
    },
    card: {
      state: {
        OPEN: 'Awaiting offers',
        CANCELLED: 'Cancelled',
        EXPIRED: 'Expired',
        OFFERS_PENDING: 'Offers pending',
        PARTIALLY_FULFILLED: 'Partially fulfilled',
        FULFILLED: 'Fulfilled'
      }
    },
    details: {
      assets: {
        title: {
          in: 'Interested in',
          out: 'Offering'
        }
      },
      cancelBtn: {
        label: 'Cancel',
        message: 'Hold to cancel'
      },
      expiresAt: 'Expires in',
      expiredAt: 'Expired'
    },
    new: {
      confirmationModal: {
        backBtn: 'Back to Selection',
        title: 'Confirm Listing',
        targetSubtitle: 'Target collection',
        itemsCount: '{count} {count, plural, =0 {} =1 {item} other {items}}',
        itemsSubtitle: 'Your {count, plural, =0 {} =1 {asset} other {assets}}',
        searchPlaceholder: 'Search by collection name',
        emptySearch: 'No collections found',
        emptyTargets: 'To add a collection, type its name\nin the input above',
        expirationTitle: 'Expires in',
        expirationValue: '7 days',
        confirmBtn: 'Confirm',
        continueBtn: 'Continue',
        clearBtn: {
          label: 'Clear',
          message: 'Hold to clear'
        }
      },
      confirmedModal: {
        title: 'Listing successfully created',
        subtitle: 'Your listing was successfully created',
        closeBtn: 'Close',
        viewBtn: 'View'
      },
      discardModal: {
        title: 'Discard Listing',
        subtitle: 'If you leave this page, your listing will be discarded',
        cancelBtn: 'Cancel',
        discardBtn: 'Discard',
        discardBtnMessage: 'Hold to discard'
      },
      banner: {
        title: 'Select your NFTs to finalize your listing',
        btn: {
          label: 'Review listing'
        }
      }
    },
    state: {
      OPEN: 'Awaiting offers',
      OFFERS_PENDING: 'Offers pending',
      PARTIALLY_FULFILLED: 'Partially fulfilled',
      FULFILLED: 'Fulfilled',
      CANCELLED: 'Cancelled'
    }
  },
  nft: {
    action: {
      listing: 'Create Listing',
      offer: 'Make Offer'
    }
  },
  notFoundPage: {
    title: 'Sorry, there’s',
    subtitle: 'nothing here',
    homeBtn: ''
  },
  offer: {
    card: {
      state: {
        OPEN: 'Pending',
        ACCEPTED: 'Accepted',
        CANCELLED: 'Cancelled',
        COMPLETED: 'Swapped',
        REJECTED: 'Rejected',
        EXPIRED: 'Expired'
      }
    },
    details: {
      backBtn: {
        label: 'Back to your profile'
      },
      expiresAt: 'Expires in',
      expiredAt: 'Expired',
      acceptBtn: 'Accept',
      cancelBtn: {
        label: 'Cancel',
        message: 'Hold to cancel'
      },
      rejectBtn: {
        label: 'Reject',
        message: 'Hold to reject'
      },
      approveBtn: 'Approve {count, plural, =0 {} =1 {NFT} other {NFTs}}',
      completeBtn: 'Swap',
      acceptModal: {
        title: 'Accept Offer',
        approval: {
          subtitle: 'To accept the offer, you first need to approve the Echo contract to transfer your NFTs'
        },
        sign: {
          subtitle: 'Great! Now you just need to sign a message so the counterparty can perform the swap',
          btn: 'Accept'
        }
      },
      approveModal: {
        btn: 'Approve'
      },
      swapModal: {
        title: 'Execute Swap',
        approval: {
          subtitle: 'To execute the swap, you first need to approve the Echo contract to transfer your NFTs'
        },
        execute: {
          subtitle: 'Great! Now you just need to execute the trade',
          btn: 'Swap'
        }
      }
    },
    expired: 'Expired',
    new: {
      confirmationModal: {
        backBtn: 'Back to Selection',
        title: 'Offer Creation',
        continueBtn: 'Continue',
        clearBtn: 'Clear',
        clearBtnMessage: 'Hold to clear'
      },
      confirmedModal: {
        title: 'Offer successfully created',
        subtitle: 'Your offer was successfully created, you can now contact your counterparty',
        closeBtn: 'Close',
        viewBtn: 'View'
      },
      discardModal: {
        title: 'Discard Offer',
        subtitle: 'If you leave this page, your offer will be discarded',
        cancelBtn: 'Cancel',
        discardBtn: 'Discard',
        discardBtnMessage: 'Hold to discard'
      },
      banner: {
        title: 'Select your NFTs to finalize your offer',
        btn: {
          label: 'Review offer'
        }
      }
    },
    state: {
      OPEN: 'Pending',
      ACCEPTED: 'Accepted',
      CANCELLED: 'Cancelled',
      COMPLETED: 'Swapped',
      REJECTED: 'Rejected'
    }
  },
  profile: {
    listingButton: {
      label: 'Create listing'
    },
    offerButton: {
      label: 'Finalize offer'
    },
    finalizeListingButton: {
      label: 'Finalize listing'
    },
    empty: {
      items: {
        message: 'You do not own any NFT available on Echo'
      },
      listingsReceived: {
        message: 'There is currently no pending listing for you',
        btn: {
          label: 'Create listing'
        }
      },
      listingsCreated: {
        message: 'You have not created any listing yet',
        btn: {
          label: 'Create listing'
        }
      },
      offersReceived: {
        message: 'You currently do not have any pending offer',
        btn: {
          label: 'Create listing'
        }
      },
      offersCreated: {
        message: 'You have not made any offer yet',
        btn: {
          label: 'Create listing'
        }
      },
      swaps: {
        message: 'You have not done any swap yet',
        btn: {
          label: 'Create listing'
        }
      }
    },
    navigation: {
      items: 'My Items',
      listingsCreated: 'My Listings',
      listingsReceived: 'Pending Listings',
      offersCreated: 'My Offers',
      offersReceived: 'Pending Offers',
      swaps: 'My Swaps'
    },
    wallet: {
      button: {
        connect: {
          label: 'Connect'
        },
        copied: {
          label: 'Copied!'
        }
      }
    }
  },
  user: {
    button: {
      label: 'Make an offer'
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
    },
    navigation: {
      items: 'Items',
      listings: 'Listings',
      swaps: 'Swaps'
    }
  }
}
