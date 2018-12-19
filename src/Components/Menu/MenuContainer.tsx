import React, {Component} from "react";
import { Query } from 'react-apollo';
import { USER_PROFILE } from 'src/sharedQueries';
import MenuPresenter from './MenuPresenter';

class MenuContainer extends Component {
    
    public render(){
        
        
        return <Query query={USER_PROFILE}>
            {({loading, error, data}) => {
                if(loading) {
                    return "loading..."
                }else if(error) {
                    return "There is error..."
                }else {
                    return <MenuPresenter driving={data.GetMyProfile.user.isDriving} />
                }
            }}
        </Query> 
    }
}

export default MenuContainer;