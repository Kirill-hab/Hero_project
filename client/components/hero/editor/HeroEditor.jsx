import React from "react";
import HeroStore from "../../../stores/HeroStore";

require("./note-editor.less");

class HeroEditor extends React.Component {
    state = {
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: "",
        catch_phrase: "",
        images: "",
    }

    componentDidMount() {
        this.updateHero();
    }

    componentDidUpdate(prevProps) {
        if (this.props.heroId !== prevProps.heroId) {
            this.updateHero();
        }
    }

    updateHero = () => {
        const {heroId} = this.props;
        if (!heroId) {
            return;
        }
        const heroes = HeroStore.getHeroes();
        const hero = heroes.find(hero => hero.id === heroId);

        this.setState({
            ...hero
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.getAttribute('id')]: event.target.value});
    }

    handleImages = (event) => {
        this.setState({superpowers: event.target.value});
    }

    handleHeroAdd = () => {
        const hero = {
            nickname: this.state.nickname,
            real_name: this.state.real_name,
            origin_description: this.state.origin_description,
            superpowers: this.state.superpowers,
            catch_phrase: this.state.catch_phrase,
            images: this.state.images,
        };

        this.props.onHeroAdd(hero);
        this.setState({nickname: '', real_name: '', origin_description: '', superpowers: '', catch_phrase: ''});
    }

    handleHeroUpdate = () => {
        const hero = {
            nickname: this.state.nickname,
            real_name: this.state.real_name,
            origin_description: this.state.origin_description,
            superpowers: this.state.superpowers,
            catch_phrase: this.state.catch_phrase,
            images: this.state.images,
        };

        this.props.onHeroUpdate(hero);
        this.setState({nickname: '', real_name: '', origin_description: '', superpowers: '', catch_phrase: ''});
    }

    handleCancel = () => {
        this.setState({
            nickname: "",
            real_name: "",
            origin_description: "",
            superpowers: "",
            catch_phrase: "",
            images: "",
        });
        this.props.handleCancelEdit();
    }

    render() {
        return (
            <div className='hero-editor'>
                <input
                    id='nickname'
                    type='text' className='form-input' placeholder='nickname'
                    value={this.state.nickname} onChange={this.handleChange}/>
                <input
                    id='real_name'
                    type='text' className='form-input' placeholder='real_name'
                    value={this.state.real_name} onChange={this.handleChange}/>
                <textarea
                    id='origin_description'
                    placeholder='description' rows={5} maxLength={100} className='form-textarea'
                    value={this.state.origin_description} onChange={this.handleChange}/>
                <input
                    id='superpowers'
                    type='text' className='form-input' placeholder='superpowers'
                    value={this.state.superpowers} onChange={this.handleChange}/>
                <input
                    id='catch_phrase'
                    type='text' className='form-input' placeholder='catch_phrase'
                    value={this.state.catch_phrase} onChange={this.handleChange}/>
                <div className='hero-editor-footer'>
                    {
                        this.props.heroId ?
                        <div className='updating-buttons'>
                            <button
                                className='hero-editor-buttons cancel-button' disabled={!this.state.nickname}
                                onClick={this.handleCancel}>
                                Cancel
                            </button>
                            <button
                                className='hero-editor-buttons update-button' disabled={!this.state.nickname}
                                onClick={this.handleHeroUpdate}>
                                Update hero
                            </button>
                        </div> :
                            <button
                                className='hero-editor-buttons add-button' disabled={!this.state.nickname} onClick={this.handleHeroAdd}>
                                Add hero
                            </button>
                    }
                </div>
            </div>
        );
    }
}

export default HeroEditor;
