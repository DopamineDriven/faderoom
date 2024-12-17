import type { JSONified, UndefinedAsNull } from "./json-old";

// Auth

export type BooksyAuthResponseAccount = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  work_phone: string;
  home_phone: string;
  gender: string;
  birthday: string | null;
  active: boolean;
  facebook_id: string | null;
  about_me: string | null;
  address_line_1: string;
  address_line_2: string;
  city: string | null;
  zipcode: number | string | null;
  apartment_number: string;
  latitude: number | null;
  longitude: number | null;
  language: string;
  photo: string | null;
  payment_auto_accept: boolean;
};

export type BooksyAuthResponse = {
  access_token: string;
  superuser: string | null;
  account: BooksyAuthResponseAccount;
  access_rights: {
    access_level: string;
  };
};

// Media

type Meta = {
  score: null;
  id: string;
  sort: number[];
  item_no: number;
};

export type Thumbnails = {
  "1170,0": {
    url: string;
  };
  "1170,1170": {
    url: string;
  };
  "750,0": {
    url: string;
  };
  "750,750": {
    url: string;
  };
  "360,0": {
    url: string;
  };
  "360,360": {
    url: string;
  };
  "150,0": {
    url: string;
  };
  "150,150": {
    url: string;
  };
  "750,500": {
    url: string;
  };
  "640,0-hr": {
    url: string;
  };
  "640,0": {
    url: string;
  };
  "240,0": {
    url: string;
  };
  "640,427": {
    url: string;
  };
  "640,427-hr": {
    url: string;
  };
};

export type Images = {
  image_id: number;
  business_id: number;
  tags: never[] | Record<string, any>;
  staffers: never[] | Record<string, any>;
  image: string;
  height: number;
  width: number;
  category: string;
  inspiration_categories: never[] | Record<string, any>;
  order: number;
  visible: boolean;
  description: null | string | string[];
  active: boolean;
  created: string;
  is_cover_photo: boolean;
  liked: boolean;
  likes_count: number;
  comments_count: number;
  comments: never[] | Record<string, any>;
  thumbnails: Thumbnails;
  meta: Meta;
  business: Biz | object;
}[];

export type Biz = {
  cover_photo: string;
  name: string;
  id: number;
};

export type Media = {
  images: Images;
  images_count: number;
  images_per_page: number;
};

export interface BooksyMedia {
  media: Media;
}

export type BooksyMediaFetchResponse = BooksyMedia;

// export interface BooksyMedia extends FetchResult{}
// Reviews

export type BooksyUser = {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
};

export type BooksyBusiness = {
  id: number;
  name: string;
  reviews_count: number;
  reviews_stars: number;
  url: string;
  full_address: string;
};

export type BooksyServices = {
  id: number;
  name: string;
  treatment_id: number;
};

export type BooksyStaff = {
  id: number;
  name: string;
};

export type BooksyPhotos =
  | {
      id: number;
      url: string;
      published: boolean | null;
    }[]
  | never[];

export type BooksyFeedbackStatus = {
  Y: number;
  N: number;
  I: number;
};

export type BooksyReviewCountPerRank = {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
};

export type BooksyReview = {
  id: number;
  rank: number;
  title: string;
  review: string;
  user: BooksyUser;
  business: BooksyBusiness;
  reply_content: string | null;
  reply_updated: string | null;
  created: string;
  updated: string;
  services: BooksyServices[];
  staff: BooksyStaff[];
  source: string | null;
  verified: boolean;
  appointment_date: string;
  photos: BooksyPhotos;
  feedback_status: BooksyFeedbackStatus;
};

export type BooksyReviewTemplate = {
  reviews: BooksyReview[];
  reviews_count: number;
  num_reviews_per_rank: BooksyReviewCountPerRank;
  reviews_rank: number;
  reviews_stars: number;
  reviews_page: number;
  reviews_per_page: number;
  yelp_rating: number | null;
  yelp_reviews_count: number | null;
  google_rating: number | null;
  google_user_ratings_total: number | null;
};

export type BooksyReviewFetchResponse = BooksyReviewTemplate;

export type BooksyJSONified = UndefinedAsNull<
  JSONified<BooksyReviewFetchResponse>
>[];

// export class BooksyWrapper {
// 	authResponse: BooksyAuthResponse;
// 	coverImages: BooksyCoverImages;
// 	photos: Photos;

// 	reviewFetchResponse: BooksyReviewFetchResponse;
// 	reviewTemplate: BooksyReviewTemplate;
// }
