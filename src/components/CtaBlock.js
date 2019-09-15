import React from 'react';
import _ from 'lodash';

import {htmlToReact, Link, safePrefix} from '../utils';

export default class CtaBlock extends React.Component {
    render() {
        return (
            <section id={_.get(this.props, 'section.section_id')} className="block cta-block outer">
              <div className="inner">
                <div className="block-outside bg-gradient">
                  <div className="block-inside">
                    <div className="block-content">
                      <h2 className="block-title">{_.get(this.props, 'section.title')}</h2>
                      {_.get(this.props, 'section.subtitle') && 
                      <p className="block-text">
                        {htmlToReact(_.get(this.props, 'section.subtitle'))}
                      </p>
                      }
                    </div>
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
