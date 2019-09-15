import React from 'react';
import _ from 'lodash';

import {classNames, Link, safePrefix} from '../utils';

export default class DocsSubmenu extends React.Component {
    render() {
        return (
            <ul className="toc-submenu">
            {_.map(_.get(this.props, 'child_pages'), (child_page, child_page_idx) => (
              <li key={child_page_idx} className={classNames('toc-item', {'current': _.get(this.props, 'page.relativePath') === _.get(child_page, 'relativePath')})}>
                <Link to={safePrefix(_.get(child_page, 'url'))}>{_.get(child_page, 'frontmatter.title')}</Link>
              </li>
            ))}
            </ul>
        );
    }
}
