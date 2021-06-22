import Hero from "../Hero.jsx";

import React from "react";
import Masonry from "react-masonry-component";
require("./heroes-grid.less");

export default class HeroesGrid extends React.Component {
    render() {
        const masonryOptions = {
                itemSelector: '.hero',
                columnWidth: 400,
                gutter: 20,
                isFitWidth: true
            }

        return(
            <Masonry className='heroes-grid' options={masonryOptions}>
                {this.props.heroes.map(hero =>
                <Hero key={hero.id} onDelete={this.props.onHeroDelete} {...hero} onEdit={this.props.onHeroEdit} />
                )}
            </Masonry>

        );
    }
}
