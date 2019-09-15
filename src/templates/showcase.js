import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {toStyleObj, safePrefix, Link, htmlToReact} from '../utils';

export default class Showcase extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              <header className="page-header bg-gradient outer">
                {_.get(this.props, 'pageContext.frontmatter.img_path') && 
                <div className="bg-img" style={toStyleObj('background-image: url(\'' + safePrefix(_.get(this.props, 'pageContext.frontmatter.img_path')) + '\')')}/>
                }
                <div className="inner-small">
                  <h1 className="page-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                  {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                  <p className="page-subtitle">{_.get(this.props, 'pageContext.frontmatter.subtitle')}</p>
                  }
                </div>
              </header>
              <div className="showcase-block outer">
                <div className="inner">
                  <div className="block-items">
                    {_.map(_.get(this.props, 'pageContext.frontmatter.items'), (item, item_idx) => (
                    <section key={item_idx} className="block-item">
                      <div className="block-item-inside">
                        {_.get(item, 'preview_img') && 
                        <Link className="block-item-preview" to={_.get(item, 'url')}>
                          <img className="thumbnail" src={safePrefix(_.get(item, 'preview_img'))} alt={_.get(item, 'title')} />
                        </Link>
                        }
                        <h2 className="block-item-title"><Link to={_.get(item, 'url')}>{_.get(item, 'title')}</Link></h2>
                        {_.get(item, 'subtitle') && 
                        <p className="block-item-text">{htmlToReact(_.get(item, 'subtitle'))}</p>
                        }
                      </div>
                    </section>
                    ))}
                  </div>
                </div>
              </div>
            </Layout>
        );
    }
}
