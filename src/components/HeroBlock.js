import React from 'react';
import _ from 'lodash';

import {
  toStyleObj,
  safePrefix,
  markdownify,
  htmlToReact,
  Link,
} from '../utils';

export default class HeroBlock extends React.Component {
  render() {
    const getBgImgClass = () => {
      return `bg-img${
        _.get(this.props, 'section.style') === 'home' ? ' bg-img--home' : ''
      }`;
    };

    return (
      <section
        id={_.get(this.props, 'section.section_id')}
        className="block hero-block bg-gradient outer"
      >
        {_.get(this.props, 'section.image') && (
          <div
            className={getBgImgClass()}
            style={toStyleObj(
              `background-image: url('${safePrefix(
                _.get(this.props, 'section.image')
              )}')`
            )}
          />
        )}
        <div className="inner-small">
          <div className="block-inside">
            <div className="block-content">
              <h2 className="block-title">
                {htmlToReact(_.get(this.props, 'section.title'))}
              </h2>
              <div className="block-text">
                {markdownify(_.get(this.props, 'section.content'))}
              </div>
              {_.get(this.props, 'section.video') &&
                htmlToReact(_.get(this.props, 'section.video'))}
              {_.get(this.props, 'section.actions') && (
                <div className="block-cta">
                  {_.map(
                    _.get(this.props, 'section.actions'),
                    (action, actionIdx) => (
                      <Link
                        key={actionIdx}
                        to={safePrefix(_.get(action, 'url'))}
                        className="button"
                      >
                        {_.get(action, 'label')}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
