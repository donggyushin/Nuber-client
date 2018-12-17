import React, {Component} from "react";
import { RouteComponentProps, withRouter } from 'react-router';
import VerifyPhonePresenter from './VerifyPhonePresenter';


class VerifyPhoneContainer extends Component<RouteComponentProps<any>> {

    public state = {
        key:""
    }



    public render(){
        const {handleInput, handleSubmit} = this;
        const {key} = this.state;
        return (
            <VerifyPhonePresenter code={key} handleInput={handleInput} handleSubmit={handleSubmit} />
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

    public handleSubmit = (event) => {
        event.preventDefault();
        const phoneNum = this.props.match.params.number;
        const {key} = this.state;

        console.log("number is" + phoneNum + " and key code is " + key);
    }
}

export default withRouter(VerifyPhoneContainer);