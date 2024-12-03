export type PlacesResponse = {
  name: string;
  id: string;
  types: string[];
  nationalPhoneNumber: string;
  internationalPhoneNumber: string;
  formattedAddress: string;
  addressComponents: {
    longText: string;
    shortText: string;
    types: string[];
    languageCode: string;
  }[];
  plusCode: { globalCode: string; compoundCode: string };
  location: { latitude: number; longitude: number };
  viewport: {
    low: { latitude: number; longitude: number };
    high: { latitude: number; longitude: number };
  };
  rating: number;
  googleMapsUri: string;
  websiteUri: string;
  regularOpeningHours: {
    openNow: boolean;
    periods: {
      open: { day: number; hour: number; minute: number };
      close: { day: number; hour: number; minute: number };
    }[];
    weekdayDescriptions: string[];
    nextCloseTime: string;
  };
  utcOffsetMinutes: number;
  adrFormatAddress: string;
  businessStatus: string;
  userRatingCount: number;
  iconMaskBaseUri: string;
  iconBackgroundColor: string;
  displayName: { text: string; languageCode: string };
  primaryTypeDisplayName: { text: string; languageCode: string };
  currentOpeningHours: {
    openNow: boolean;
    periods: {
      open: {
        day: number;
        hour: number;
        minute: number;
        date: { year: number; month: number; day: number };
      };
      close: {
        day: number;
        hour: number;
        minute: number;
        date: { year: number; month: number; day: number };
      };
    }[];
    weekdayDescriptions: string[];
    nextCloseTime: string;
  };
  primaryType: string;
  shortFormattedAddress: string;
  reviews: {
    name: string;
    relativePublishTimeDescription: string;
    rating: number;
    text: { text: string; languageCode: string };
    originalText: { text: string; languageCode: string };
    authorAttribution: { displayName: string; uri: string; photoUri: string };
    publishTime: string;
    flagContentUri: string;
    googleMapsUri: string;
  }[];
  photos: {
    name: string;
    widthPx: number;
    heightPx: number;
    authorAttributions: {
      displayName: string;
      uri: string;
      photoUri: string;
    }[];
    flagContentUri: string;
    googleMapsUri: string;
  }[];
  goodForChildren: boolean;
  restroom: boolean;
  accessibilityOptions: {
    wheelchairAccessibleParking: boolean;
    wheelchairAccessibleEntrance: boolean;
    wheelchairAccessibleRestroom: boolean;
  };
  generativeSummary: {
    overview: { text: string; languageCode: string };
    overviewFlagContentUri: string;
  };
  containingPlaces: { name: string; id: string }[];
  pureServiceAreaBusiness: boolean;
  addressDescriptor: {
    landmarks: (
      | {
          name: string;
          placeId: string;
          displayName: { text: string; languageCode: string };
          types: string[];
          spatialRelationship: string;
          straightLineDistanceMeters: number;
          travelDistanceMeters: number;
        }
      | {
          name: string;
          placeId: string;
          displayName: { text: string; languageCode: string };
          types: string[];
          straightLineDistanceMeters: number;
          travelDistanceMeters: number;
          spatialRelationship?: undefined;
        }
    )[];
    areas: {
      name: string;
      placeId: string;
      displayName: { text: string; languageCode: string };
      containment: string;
    }[];
  };
  googleMapsLinks: {
    directionsUri: string;
    placeUri: string;
    writeAReviewUri: string;
    reviewsUri: string;
    photosUri: string;
  };
};
