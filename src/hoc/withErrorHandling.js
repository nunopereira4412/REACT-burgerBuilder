import React, {Component} from 'react';

import Aux                from './Aux';
import Modal              from '../components/UI/Modal/Modal';

const withErrorHandling = (WrappedComponent, axios) => (
    class extends Component {

        state = {
            error: null
        }

        //constructor should be used instead of componentWillMount but that way, we cant use setState because thats only allowed once this component is mounted. Then a solution not using componentWillMount could be using props to handle the error here during a .catch of the .get on BurgerBuilder
        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            }, error => this.setState({error: error}));

            this.responseInterceptor = axios.interceptors.response.use(response => response, error => this.setState({error: error}));
        }


        componentDidMount() {}

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        modalClosedHandler = () => this.setState({error: null})

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.modalClosedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
);

export default withErrorHandling;