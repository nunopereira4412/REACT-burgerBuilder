import {useState, useEffect} from 'react';

export default httpClient => {

    const [error, setError] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    }, error => setError(error));

    const responseInterceptor = httpClient.interceptors.response.use(response => 
        response, error => setError(error));

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        };
    }, [requestInterceptor, responseInterceptor]);

    const modalClosedHandler = () => setError(null);

    return [error, modalClosedHandler];

};