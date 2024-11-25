export type BooksyConfig = {
  readonly accessToken: string;
  readonly blobReadWriteToken: string;
  readonly booksyBizEmail: string;
  readonly booksyBizPassword: string;
  readonly booksyBizApiKey: string;
  readonly booksyBizAuthorizationSecret: string;
  readonly booksyBizAuthHeader: string;
  readonly booksyBizXFingerprint: string;
};

export type VercelBlobShape = {
  url: string;
  downloadUrl: string;
  pathname: string;
  size: number;
  uploadedAt: string;
};
