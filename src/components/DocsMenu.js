import React from 'react';
import _ from 'lodash';

import {getPage, classNames, Link, safePrefix, getPages} from '../utils';
import DocsSubmenu from './DocsSubmenu';

export default class DocsMenu extends React.Component {
    render() {
        let site = _.get(this.props, 'site');
        let page = _.get(this.props, 'page');
        let root_page_path = _.get(site, 'data.doc_sections.root_folder') + 'index.md';
        let root_page = getPage(this.props.pageContext.pages, root_page_path);
        return (
            <nav id="docs-nav" className="docs-nav">
              <div id="docs-nav-inside" className="docs-nav-inside sticky">
                <button id="docs-nav-toggle" className="docs-nav-toggle">Navigate Docs<span className="icon-angle-right" aria-hidden="true" /></button>
                <div className="docs-toc-wrap">
                  <ul id="docs-toc" className="docs-toc">
                    <li className={classNames('toc-item', {'current': _.get(page, 'relativePath') === _.get(root_page, 'relativePath')})}>
                      <Link to={safePrefix(_.get(root_page, 'url'))}>{_.get(root_page, 'frontmatter.title')}</Link>
                    </li>
                    {_.map(_.get(site, 'data.doc_sections.sections'), (section, section_idx) => {
                        let section_folder = _.get(site, 'data.doc_sections.root_folder') + section;
                        let section_page_path = section_folder + '/index.md';
                        let section_page = getPage(this.props.pageContext.pages, section_page_path);
                        let child_pages = _.orderBy(_.filter(getPages(this.props.pageContext.pages, section_folder), item => _.get(item, 'base') != 'index.md'), 'frontmatter.weight');
                        let child_count = _.size(child_pages);
                        let has_children = (child_count > 0) ? true : false;
                        let is_current_page = (_.get(page, 'relativePath') === _.get(section_page, 'relativePath')) ? true : false;
                        let is_active = ((_.get(page, 'relativeDir') === _.get(section_page, 'relativeDir')) || (_.get(page, 'relativePath') === _.get(section_page, 'relativePath'))) ? true : false;
                        return (<React.Fragment key={section_idx}>
                          <li key={section_idx} className={classNames('toc-item', {'has-children': has_children, 'current': is_current_page, 'active': is_active})}>
                            <Link to={safePrefix(_.get(section_page, 'url'))}>{_.get(section_page, 'frontmatter.title')}</Link>
                            {has_children && <React.Fragment>
                              <button className="submenu-toggle"><span className="screen-reader-text">Submenu</span><span className="icon-angle-right" aria-hidden="true" /></button>
                              <DocsSubmenu {...this.props} child_pages={child_pages} page={page} site={site} />
                            </React.Fragment>}
                          </li>
                        </React.Fragment>)
                    })}
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
}
