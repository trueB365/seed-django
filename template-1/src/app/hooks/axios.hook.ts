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

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response: AxiosResponse<T> = await axios({
                    url,
                    method,
                    data: requestData,
                    headers,
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
    }, [url, method, requestData, headers]);

    return { data, isLoading, error };
};

export default useAxiosFetch;
