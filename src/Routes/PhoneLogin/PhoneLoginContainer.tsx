import React, {Component} from "react";
import {toast} from 'react-toastify';
import PhoneLoginPresenter from './PhoneLoginPresenter';

class PhoneLoginContainer extends Component {


    public state = {
        dial_code:"+82",
        phone_number:""
    }

    public render(){
        const {dial_code, phone_number} = this.state;
        const {onInputChange, onSubmit} = this;
        return (
            <PhoneLoginPresenter dial_code={dial_code} phone_number={phone_number}
                onInputChange={onInputChange} onSubmit={onSubmit}
            />
        )
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

    public onSubmit = event => {
        const {phone_number, dial_code} = this.state;
        event.preventDefault();
        const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        const valid = (dial_code+phone_number).match(phoneno);
        if(valid){
            toast.success("success", {
                position:toast.POSITION.BOTTOM_CENTER
            })
        }else {
            toast.error("Invalid phone number", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        
    }
}

export default PhoneLoginContainer;