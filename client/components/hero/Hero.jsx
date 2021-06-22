import React from "react";

require("./hero.less");

export default class Hero extends React.Component {
    render() {
        const {id, nickname, real_name, origin_description, superpowers, catch_phrase, color, onDelete, onEdit} = this.props;
        const style = {backgroundColor: color};
        return (
            <div className="hero" style={style}>
                <div className='header'>
                    <span className='delete-icon' onClick={() => {
                        onDelete(id);
                    }}>
                        &times;
                    </span>


                </div>
                    <img src='./pencil-square.svg'  className="bi bi-pencil-square change" width="16" height="16"  onClick={() => {onEdit(id);}}/>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='hero-logo'>
                            <img src='./Cart-Hero.png' alt={"logo"}/>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        {nickname && <p className='hero-field'>nickname: {nickname}</p>}
                        {real_name && <p className='hero-field'>real_name: {real_name}</p>}
                        {origin_description && <p className='hero-field'>origin_description: {origin_description}</p>}
                        {superpowers && <p className='hero-field'>superpowers: {superpowers}</p>}
                        {catch_phrase && <p className='hero-field'>catch_phrase: {catch_phrase}</p>}
                    </div>
                </div>

            </div>
        );
    }
}
