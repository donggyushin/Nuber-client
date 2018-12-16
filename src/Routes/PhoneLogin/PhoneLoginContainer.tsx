import React, {Component} from "react";
import { Mutation } from 'react-apollo';
import {toast} from 'react-toastify';
import PhoneLoginPresenter from './PhoneLoginPresenter';
import { PHONE_SIGN_IN } from './PhoneQueries.queries';

class PhoneLoginContainer extends Component {


    public state = {
        dial_code:"+8210",
        phone_number:""
    }

    public render(){
        const {dial_code, phone_number} = this.state;
        const {onInputChange} = this;
        return <Mutation mutation={PHONE_SIGN_IN} variables={{ phoneNumber: `${dial_code}${phone_number}` }}
            update={this.afterSubmit}
        >
            {(mutation, { loading }) => {

                const onSubmit = event => {
                    
                    event.preventDefault();
                    const phoneno = /^\+?([0-9]{4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
                    const valid = (dial_code + phone_number).match(phoneno);
                    if (valid) {
                        
                        mutation();
                    } else {
                        toast.error("Invalid phone number", {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                    }

                }


                return (
            <PhoneLoginPresenter dial_code={dial_code} phone_number={phone_number} onInputChange={onInputChange} onSubmit={onSubmit} />
                )}}
          </Mutation>;
    }


    public onInputChange = event => {
        const {target: {name, value}} = event;
        if(name === "dial_code"){
            this.setState({
                ...this.state,
                dial_code: value
            })
        }else {
            this.setState({
                ...this.state,
                phone_number: value
            })
        }   
    }

    public afterSubmit = (cache, result) => {
        console.log(result)
        const {data:{StartPhoneVerification}} = result;
        if(StartPhoneVerification.ok) {
            return;
        }else {
            toast.error(StartPhoneVerification.error, {
              position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    
}

export default PhoneLoginContainer;