import React, {Component} from "react";
import { graphql,Mutation } from "react-apollo";
import { toast } from 'react-toastify';
import { LOG_USER_IN } from 'src/sharedQueries';
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from './SocialLoginQueries';

class SocialLoginContainer extends Component<any> {
    public state = {
        email:"",
        fbId:"",
        firstName:"",
        lastName:""
    }

    public mutation;
    public render(){
        const {email, fbId, firstName, lastName} = this.state;
        return <Mutation mutation={FACEBOOK_CONNECT} variables={{email, 
        fbId, 
        firstName, 
        lastName}}
        onCompleted={(data)=>{
            console.log(data);
            const { FacebookConnect: {token}} = data;
            if(token ){
                
                toast.success("Logging you in...");
                setTimeout(() => {
                    this.props.logUserIn({
                      variables: { token }
                    });
                }, 2500);
            }else {
                toast.error("Fail to find user Token", {
                    position:toast.POSITION.BOTTOM_CENTER
                })
            }

        }}
        >
        {(mutation, {data}) => {
            this.mutation = mutation;
            return <SocialLoginPresenter loginCallBack={this.loginCallback} />;
        }}
            
          </Mutation>;
    }

    public loginCallback = (response) => {
        
        const {first_name, last_name, email, id, name, accessToken} = response;
        if(accessToken){
            toast.success(`Welcome ${name}`, {
                position:toast.POSITION.BOTTOM_CENTER
            })
            this.mutation({
                variables: {
                    email, fbId:id,
                    firstName:first_name,
                    lastName:last_name
                }
            })
        }else {
            toast.error("Could not log you in 😅", {
                position:toast.POSITION.BOTTOM_CENTER
            })
        }
    }
}

export default graphql(LOG_USER_IN, {
    name:"logUserIn"
})(SocialLoginContainer);