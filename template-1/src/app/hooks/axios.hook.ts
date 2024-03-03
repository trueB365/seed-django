'use client';
import { useState, useEffect } from 'react';
import axios, { Method, AxiosResponse } from 'axios';

interface UseAxiosFetchProps<T> {
    url: string;
    method: Method;
    data?: T;
    headers?: Record<string, string>;
}




const useAxiosFetch = <T,>(props: UseAxiosFetchProps<T>) => {
    const { url, method, data: requestData, headers } = props;
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [queryParams, setQueryParams] = useState<{[key:string]: string | number | null } | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response: AxiosResponse<T> = await axios({
                    url,
                    method,
                    data: requestData,
                    headers,
                    params: { ...queryParams }
                });
                setData(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        if (url && method) {
            fetchData();
        }
    }, [url, method, requestData, headers, queryParams]);

    return { data, isLoading, error, setQueryParams };
};

export default useAxiosFetch;
