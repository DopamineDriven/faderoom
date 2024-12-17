import { ExecuteReviewSubmissionMutation } from "@/mutations/review-submission";
import { BooksyService } from "./booksy";

const booksyService = new BooksyService(process.cwd());

const rev = {
  anonymized: false,
  appointment_date: 1712147400000,
  business: {
    id: 481001,
    name: "The Fade Room",
    reviews_count: 168,
    reviews_stars: 5,
    url: "481001_the-fade-room_barber-shop_18688_highland-park",
    thumbnail_photo:
      "https://d2zdpiztbgorvt.cloudfront.net/region1/us/481001/logo/eb9dc22b2da249729c153f8e73121f-the-fade-room-inc-logo-dceafa0fdea34e96ab27077992192f-booksy.jpeg",
    full_address: "Skokie Valley Rd, 229, 60035 Highland Park"
  },
  created: 1712269140000,
  feedback_status: {
    Y: 0,
    N: 0,
    I: 0
  },
  id: 7199455,
  photos: {
    id: 662323,
    url: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/481001/review_photos/4d1ff0fdc22c417e9e4ff1b7a9147ad0.jpeg",
    published: null
  },
  photos_length: 1,
  rank: 5,
  reply_content:
    "Thank you we love making our little clients feel welcome and comfortable as possible, so they can leave not only looking good but also looking forward to their next cut!",
  reply_updated: 1712282760000,
  review:
    "Thank you for a lovely experience with my 4 year old son. Cindy was patient, attentive, approachable and flexible. She repeatedly explained to my tentative son what was going to happen next and gave him a chance to touch/explore all instruments prior to use.",
  services: "Kid’s Haircut",
  source: null,
  staff: "Cynthia Sanchez",
  title: "",
  user: "Andra F.",
  updated: 1712282760000,
  verified: true
} as const;

type HelperProps<T> =
  T extends `https://d2zdpiztbgorvt.cloudfront.net/region1/us/481001/review_photos/${infer U}.jpeg`
    ? U
    : T;

const helper = <const T extends string>(t: T) => {
  return (t
    ?.split(/\.jpeg/g)?.[0]
    ?.split(/\//g)
    ?.reverse()?.[0] ?? "") as HelperProps<T>;
};

booksyService
  .assetToBlob(rev.photos.url)
  .then(blobby => {
    const f = new File([blobby], helper(rev.photos.url).concat(".jpeg"), {
      type: booksyService.getMime("jpeg")
    });

    const formData = new FormData();
    formData.append("file", f);
    formData.append("body", rev.review);
    formData.append("firstName", rev.user.split(" ")?.[0] ?? "");
    formData.append("lastName", rev.user.split(" ")?.[1] ?? "");
    formData.append("rating", rev.rank.toString(10));
    formData.set("created", rev.created.toString(10));
    return ExecuteReviewSubmissionMutation({
      body: rev.review,
      date: rev.created,
      file: f,
      firstName: rev.user.split(" ")?.[0] ?? "",
      lastName: rev.user.split(" ")?.[1] ?? "",
      rating: rev.rank
    });
  })
  .then(data => {
    console.log(data);
    return data;
  })
  .catch(err =>
    typeof err === "string"
      ? console.error(err)
      : Array.isArray(err)
        ? console.error(JSON.stringify(err[0], null, 2))
        : console.error(JSON.stringify(err, null, 2))
  );
