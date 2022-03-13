import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";

type METHOD = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type AnyOBJ = { [key: string]: string };

const BASE_URL = "https://fakestoreapi.com";

// Create a client
export const getClient = (() => {
    let client: QueryClient | null = null;
    return () => {
        if (!client) client = new QueryClient();
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
        const url = `${BASE_URL}/${path}`;
        const fetchOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": BASE_URL,
            },
        };

        const response = await fetch(url, fetchOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const QueryKeys = {
    PRODUCTS: "PRODUCTS",
};
