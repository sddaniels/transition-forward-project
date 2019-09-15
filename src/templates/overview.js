import React from 'react';
import _ from 'lodash';

import components, {Layout} from '../components/index';
import {toStyleObj, safePrefix, getPage, getPages, classNames, Link, htmlToReact} from '../utils';

export default class Overview extends React.Component {
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
              <div className="docs-block outer">
                <div className="inner">
                  <div className="block-items">
                    {_.map(_.get(this.props, 'pageContext.site.data.doc_sections.sections'), (section, section_idx) => {
                        let section_folder = _.get(this.props, 'pageContext.site.data.doc_sections.root_folder') + section;
                        let section_page_path = section_folder + '/index.md';
                        let section_page = getPage(this.props.pageContext.pages, section_page_path);
                        let child_pages = _.filter(getPages(this.props.pageContext.pages, section_folder), item => _.get(item, 'base') != 'index.md');
                        let child_count = _.size(child_pages);
                        let has_children = (child_count > 0) ? true : false;
                        return (<React.Fragment key={section_idx}>
                          <section key={section_idx} className="block-item">
                            <div className="block-item-inside">
                              <h2 className={classNames('block-item-title', {'line-left': has_children})}><Link to={safePrefix(_.get(section_page, 'url'))}>{_.get(section_page, 'frontmatter.title')}</Link></h2>
                              {_.get(section_page, 'frontmatter.excerpt') && <React.Fragment>
                                <p className="block-item-text">{htmlToReact(_.get(section_page, 'frontmatter.excerpt'))}</p>
                                <p className="block-item-cta"><Link to={safePrefix(_.get(section_page, 'url'))}>Learn More <span className="icon-arrow-right" aria-hidden="true" /></Link></p>
                              </React.Fragment>}
                            </div>
                          </section>
                        </React.Fragment>)
                    })}
                  </div>
                </div>
              </div>
              {_.map(_.get(this.props, 'pageContext.frontmatter.sections'), (section, section_idx) => {
                  let GetSectionComponent = components[_.get(section, 'component')];
                  return (
                    <GetSectionComponent key={section_idx} {...this.props} section={section} site={this.props.pageContext.site} />
                  )
              })}
            </Layout>
        );
    }
}
