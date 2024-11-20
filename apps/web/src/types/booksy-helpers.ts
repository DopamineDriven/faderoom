export type BooksyLoginPayload = {
  access_token: string;
  superuser: string | null;
  account: {
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
      facebook_id: string |null;
      google_id: string |null;
      apple_user_uuid: string |null;
      about_me: string | null;
      address_line_1: string;
      address_line_2: string;
      city: string | null;
      zipcode: string | null;
      apartment_number: string | null;
      latitude: string | number | null;
      longitude: string | number |null;
      language: string;
      photo: string | null;
      payment_auto_accept: boolean;
  };
  access_rights: {
      access_level: string;
  };
  password_change_required: boolean;
  connected_with: string;
  first_login: boolean;
};

export type BooksyReviewsEntity = {
  business: {
    id: number;
    name: string;
    reviews_count: number;
    reviews_stars: number;
    url: string;
    thumbnail_photo: string;
    full_address: string;
  };
  rank: number;
  review: string;
  services: { id: number; name: string; treatment_id: number }[];
  staff: { id: number; name: string }[];
  title: string;
  user: { id: number; first_name: string; last_name: string };
  verified: boolean;
  appointment_date: string;
  created: string;
  id: number;
  reply_content: string | null;
  reply_updated: string | null;
  source: string | null;
  updated: string;
  anonymized: boolean;
  photos: never[];
  feedback_status: { Y: number; N: number; I: number };
}

export type BooksyReviewsEntityModified = {
  business: {
    id: number;
    name: string;
    reviews_count: number;
    reviews_stars: number;
    url: string;
    thumbnail_photo: string;
    full_address: string;
  };
  rank: number;
  review: string;
  services: { id: number; name: string; treatment_id: number }[];
  staff: { id: number; name: string }[];
  title: string;
  user: { id: number; first_name: string; last_name: string };
  verified: boolean;
  appointment_date: string;
  created: number;
  id: number;
  reply_content: string | null;
  reply_updated: string | null;
  source: string | null;
  updated: string;
  anonymized: boolean;
  photos: never[];
  feedback_status: { Y: number; N: number; I: number };
}

export type BooksyReviewsByPagePerPagePayload = {
  reviews: BooksyReviewsEntity[];
  reviews_count: number;
  num_reviews_per_rank: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
  reviews_rank: number;
  reviews_stars: number;
  reviews_page: number;
  reviews_per_page: number;
};

export type BooksyReviewsByPagePerPagePayloadModified = {
  reviews: BooksyReviewsEntityModified[];
  reviews_count: number;
  num_reviews_per_rank: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
  reviews_rank: number;
  reviews_stars: number;
  reviews_page: number;
  reviews_per_page: number;
};
