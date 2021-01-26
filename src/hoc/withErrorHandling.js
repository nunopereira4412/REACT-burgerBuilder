import React, {useState, useEffect} from 'react';

import Aux                from './Aux';
import Modal              from '../components/UI/Modal/Modal';

const withErrorHandling = (WrappedComponent, axios) => (
    props => {

        const [error, setError] = useState(null);

        const requestInterceptor = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        }, error => setError(error));

        const responseInterceptor = axios.interceptors.response.use(response => 
            response, error => setError(error));

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, [requestInterceptor, responseInterceptor]);

        const modalClosedHandler = () => setError(null);

        
        return (
            <Aux> 
                <Modal 
                    show={error}
                    modalClosed={modalClosedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        ); 
    }
);

export default withErrorHandling;