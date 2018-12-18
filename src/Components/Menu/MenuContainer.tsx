import React, {Component} from "react";
import MenuPresenter from './MenuPresenter';

class MenuContainer extends Component {
    public state = {
        driving: false
    }
    public render(){
        const {driving} = this.state;
        
        return <MenuPresenter driving={driving}  />
    }
}

export default MenuContainer;