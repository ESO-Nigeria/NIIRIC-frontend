import { publicationApi } from "./publications";

export const {
	useGetPublicationsQuery,
	useGetUserPublicationsQuery,
	useUploadPublicationMutation,
	useGetPublicationByIdQuery
	// useLikePublicationMutation,
	// useCommentOnPublicationMutation,
	// useSharePublicationMutation,
} = publicationApi;
