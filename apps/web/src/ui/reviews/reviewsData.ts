export interface Review {
  id: number;
  author: string;
  content: string;
  likes: number;
  date: string;
}

export const reviewsData = [
  {
    id: 1,
    author: "John Doe",
    content: "Great product! Highly recommended.",
    likes: 15,
    date: "2023-05-01"
  },
  {
    id: 2,
    author: "Jane Smith",
    content: "Excellent service and fast delivery.",
    likes: 10,
    date: "2023-05-02"
  },
  // ... Add more review objects here, up to 30 or more for multiple pages
  {
    id: 30,
    author: "Mike Johnson",
    content: "Could be better, but overall satisfied.",
    likes: 5,
    date: "2023-05-30"
  }
] satisfies Review[];
