import React            from 'react';

import Aux              from './Aux';
import Modal            from '../components/UI/Modal/Modal';
import httpErrorHandler from '../hooks/httpErrorHandler';

const withErrorHandling = (WrappedComponent, axios) => (

    props => {
    
        const [error, modalClosedHandler] = httpErrorHandler(axios);
        console.log(error);
        return (
            <Aux> 
                <Modal 
                    show        =  {error}
                    modalClosed = {modalClosedHandler}
                >
                    {error && error.message}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        ); 
    }
);

export default withErrorHandling;