import React from "react";
import HeroActions from "../../actions/HeroActions";
import HeroStore from "../../stores/HeroStore";

import HeroEditor from "../hero/editor/HeroEditor.jsx";
import HeroesGrid from "../hero/grid/HeroesGrid.jsx";

require("./app.less");

function getStateFromFlux() {
    return {
        isolation: HeroStore.isLoading(),
        heroes: HeroStore.getHeroes(),
        heroChe: HeroStore.isLoading()
    };
}

class App extends React.Component {
    state = {
        editHeroId: '',
        ...getStateFromFlux()
    }

    componentWillMount() {
        HeroActions.loadHeroes();
    }

    componentDidMount() {
        HeroStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        HeroStore.removeChangeListener(this._onChange);
    }

    handleHeroAdd(data) {
        HeroActions.createHero(data);
    }

    handleHeroUpdate = (data) => {
        HeroActions.updateHero(this.state.editHeroId, data);
        this.setState({
            editHeroId: ''
        });
    }

    handleHeroDelete(id) {
        HeroActions.deleteHero(id);
    }

    handleEditHero = (editHeroId) => {
        this.setState({
            editHeroId
        });
    }

    handleCancelEdit = () => {
        this.setState({
            editHeroId: ''
        });
    }

    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            Super Heroes
                        </a>
                    </div>
                </nav>
                <HeroEditor
                    onHeroAdd={this.handleHeroAdd}
                    heroId={this.state.editHeroId}
                    handleCancelEdit={this.handleCancelEdit}
                    onHeroUpdate={this.handleHeroUpdate}
                />
                <HeroesGrid heroes={this.state.heroes} onHeroDelete={this.handleHeroDelete} onHeroEdit={this.handleEditHero}/>
            </div>
        );
    }

    _onChange = () => {
        this.setState(getStateFromFlux());
    }
}

export default App;
