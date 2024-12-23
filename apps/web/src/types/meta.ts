export type MetaApiRes = {
  data: {
    webp_images: {
      height: number;
      source: string;
      width: number;
    }[];
    width: number;
    height: number;
    likes: {
      data: never[];
      paging: {
        cursors: {
          before: string;
          after: string;
        };
      };
      summary: {
        total_count: number;
        can_like: boolean;
        has_liked: boolean;
      };
    };
    name: string;
    created_time: string;
    id: string;
  };
};
