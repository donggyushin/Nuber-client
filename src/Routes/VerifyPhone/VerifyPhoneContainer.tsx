import React, {Component} from "react";
import { Mutation } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';
import { toast } from 'react-toastify';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { VERIFY_PHONE } from './VerifyPhoneQueries';


class VerifyPhoneContainer extends Component<RouteComponentProps<any>> {

    public state = {
        key:""
    }



    public render(){
        const {handleInput} = this;
        const {key} = this.state;
        const phoneNum = this.props.match.params.number;
        return (
            <Mutation mutation={VERIFY_PHONE} variables={{key, phoneNumber:phoneNum}}
            onCompleted={(data) => {
                const response = data.CompletePhoneVerification;
                if(response.ok){

                    toast.success("You're verified, you're logging now", {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    return;
                }else {
                    toast.error(response.error, {
                        position:toast.POSITION.BOTTOM_CENTER
                    });
                }
            }}
            >
            {(mutation, {loading}) => {
                    const handleSubmit = (event) => {
                        event.preventDefault();

                        mutation();

                    }
                return (
                    <VerifyPhonePresenter code={key} handleInput={handleInput} handleSubmit={handleSubmit} 
                    loading={loading}
                    />
                )
            }}
                

            </Mutation>
            
        )
    }


    public handleInput = (event) => {
        const {target: {value}} = event;
        console.log(value);
        this.setState({
            ...this.state,
            key: value
        })
    }

    
}

export default withRouter(VerifyPhoneContainer);