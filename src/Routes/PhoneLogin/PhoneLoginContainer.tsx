import React, {Component} from "react";
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
        event.preventDefault();
        console.log(this.state.dial_code);
        console.log(this.state.phone_number);
    }
}

export default PhoneLoginContainer;