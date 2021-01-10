import React, {Component} from 'react';

import Aux                from './Aux';
import Modal              from '../components/UI/Modal/Modal';

const withErrorHandling = (WrappedComponent, axios) => (
    class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            }, error => this.setState({error: error}));

            axios.interceptors.response.use(response => response, error => this.setState({error: error}));
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
                    <WrappedComponent/>
                </Aux>
            );
        }
    }
);

export default withErrorHandling;