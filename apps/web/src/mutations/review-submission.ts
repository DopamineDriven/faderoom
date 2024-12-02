import { print } from "graphql";
import type {
  ExecuteReviewFormSubmissionMutationProps,
  SubmissionPayloadProps
} from "@/types/wp";
import { DateCreatedHelper } from "@/utils/date-created"
import { EncodeClientMutationId } from "@/utils/encode-client-mutation-id";
import { fetchWpAPI } from "@/utils/fetch-wp";
import { SubmissionWorkup } from "./submission-workup";


/* eslint-disable @typescript-eslint/no-non-null-assertion  */

export async function ExecuteReviewSubmissionMutation<
  const T extends ExecuteReviewFormSubmissionMutationProps
>({ body, date, firstName, lastName, rating, ip, userAgent, file }: T) {
  return await fetchWpAPI<SubmissionPayloadProps>(print(SubmissionWorkup), {
    input: {
      clientMutationId: EncodeClientMutationId(firstName, lastName),
      id: 1,
      entryMeta: {
        createdById: 1,
        dateCreatedGmt: DateCreatedHelper(Date),
        ip: ip ?? "",
        userAgent: userAgent ?? ""
      },
      fieldValues: [
        {
          id: 1,
          nameValues: {
            first: firstName,
            last: lastName
          }
        },
        {
          id: 4,
          value: `${date}`
        },
        {
          id: 7,
          value: `${rating}`
        },
        {
          id: 5,
          value: body
        },
        { id: 9, imageValues: {
          image: file
        } }
      ]
    }
  }).then(data => data!);
}
