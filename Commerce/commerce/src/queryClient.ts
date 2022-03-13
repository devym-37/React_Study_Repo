import request, { RequestDocument } from "graphql-request";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";

type METHOD = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type AnyOBJ = { [key: string]: string };

const BASE_URL = "/";

// Create a client
export const getClient = (() => {
    let client: QueryClient | null = null;
    return () => {
        if (!client)
            client = new QueryClient({
                defaultOptions: {
                    queries: {
                        cacheTime: 1000 * 60 * 60 * 24,
                        staleTime: 1000 * 60,
                        refetchOnMount: false,
                        refetchOnReconnect: false,
                        refetchOnWindowFocus: false,
                    },
                },
            });
        return client;
    };
})();

export const fetcher = async ({
    method,
    path,
    body,
    params,
}: {
    method: METHOD;
    path: string;
    body?: AnyOBJ;
    params?: AnyOBJ;
}) => {
    try {
        let url = `${BASE_URL}/${path}`;
        const fetchOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": BASE_URL,
            },
        };

        if (params) {
            const searchParams = new URLSearchParams(params);
            url += "?" + searchParams.toString();
        }

        if (body) fetchOptions.body = JSON.stringify(body);

        const response = await fetch(url, fetchOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const graphqlFetcher = (query: RequestDocument, variables = {}) => request(BASE_URL, query, variables);

export const QueryKeys = {
    PRODUCTS: "PRODUCTS",
};
