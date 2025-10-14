import { nirricApi } from "../api";

export const opportunityApi = nirricApi.injectEndpoints({
	endpoints: (builder) => ({
		getOpportunities: builder.query({
			query: (params: Record<string, any> = {}) => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          ) {
            return; // skip empty filters
          }

          if (Array.isArray(value)) {
            value.forEach((v) => {
              // ensure we only append strings or numbers
              const safeValue =
                typeof v === "object" ? JSON.stringify(v) : String(v);
              searchParams.append(key, safeValue);
            });
          } else {
            const safeValue =
              typeof value === "object" ? JSON.stringify(value) : String(value);
            searchParams.append(key, safeValue);
          }
        });

        return `/api/funding-opportunities/?${searchParams.toString()}`;
      },
		}),
	}),

	overrideExisting: false,
});
