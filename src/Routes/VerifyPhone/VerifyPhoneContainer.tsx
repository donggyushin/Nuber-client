import React from "react";
import { graphql,Mutation } from 'react-apollo';
import {  withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from 'src/sharedQueries';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { VERIFY_PHONE } from './VerifyPhoneQueries';





class VerifyPhoneContainer extends React.Component<any> {

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
                console.log(response);
                if(response.ok){

                    toast.success("You're verified, you're logging now", {
                        position: toast.POSITION.BOTTOM_CENTER
                    })

                    setTimeout(() => {
                        this.props.logUserIn({
                            variables: {
                                token: response.token
                            }
                        });    
                    }, 2500);

                    
                }else {
                    toast.error(response.error, {
                        position:toast.POSITION.BOTTOM_CENTER
                    });
                }
            }}
            update={(cache, {data}) => {
                console.log(data);
                // cache.writeData({
                //     data: {
                //         auth: {
                //             __typename: "Auth",
                //             isLoggedIn: true
                //         }
                //     }
                // })
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
        this.setState({
            ...this.state,
            key: value
        })
    }

    
}

export default graphql(LOG_USER_IN, {
  name: "logUserIn"
})(withRouter(VerifyPhoneContainer));