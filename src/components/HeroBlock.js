import React from 'react';
import _ from 'lodash';

import {toStyleObj, safePrefix, markdownify, htmlToReact, Link} from '../utils';

export default class HeroBlock extends React.Component {
    render() {
        return (
            <section id={_.get(this.props, 'section.section_id')} className="block hero-block bg-gradient outer">
              {_.get(this.props, 'section.image') &&
              <div className="bg-img" style={toStyleObj('background-image: url(\'' + safePrefix(_.get(this.props, 'section.image')) + '\')')}/>
              }
              <div className="inner-small">
                <div className="block-inside">
                  <div className="block-content">
                    <h2 className="block-title">{htmlToReact(_.get(this.props, 'section.title'))}</h2>
                    <div className="block-text">
                      {markdownify(_.get(this.props, 'section.content'))}
                    </div>
                    <iframe title="Introduction Video" width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    {_.get(this.props, 'section.actions') &&
                      <div className="block-cta">
                        {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                        <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} className="button secondary">{_.get(action, 'label')}</Link>
                        ))}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </section>
        );
    }
}
