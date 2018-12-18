import React, {Component} from "react";
import HomePresenter from './HomePresenter';

class HomeContainer extends Component {
    public state = {
        sidebarOpen: true
    }
    public render(){
        const {sidebarOpen} = this.state;
        const {onSetSidebarOpen} = this;
        return (
            <HomePresenter sidebarOpen={sidebarOpen} onSetSidebarOpen={onSetSidebarOpen} />
        )
    }

    public onSetSidebarOpen = () => {
        this.setState({
            ...this.state,
            sidebarOpen: !this.state.sidebarOpen
        })
    }
}

export default HomeContainer;