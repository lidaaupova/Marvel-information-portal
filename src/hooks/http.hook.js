import {useState, useCallback} from "react";

export const useHttp = () => {
    const [processState, setProcessState] = useState('waiting');

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = {'Content-Type': 'aplication/json'}) => {

            setProcessState('loading');

            try {
                const response = await fetch(url, {method, body, headers});

                if(!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }

                const data = await response.json();

                return data;

            } catch(e) {
                setProcessState('error');
                throw e;
            }
    }, [])

    const clearError = useCallback(() => {
        setProcessState('loading');
    }, []);

    return {request, clearError, processState, setProcessState};
}