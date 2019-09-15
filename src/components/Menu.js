import React from 'react';
import _ from 'lodash';

import {classNames, Link, safePrefix} from '../utils';

export default class Menu extends React.Component {
    render() {
        return (
            <ul className={_.get(this.props, 'menu_class')}>
              {_.map(_.get(this.props, 'menu'), (item, item_idx) => {
                  let menu = _.get(item, 'items');
                  let page = _.get(this.props, 'page');
                  return (
                  <li key={item_idx} className={classNames('menu-item', {'has-children': _.size(_.get(item, 'items')) > 0}, {'current': _.get(this.props, 'page.url') === _.get(item, 'url')})}>
                    <Link to={(_.get(item, 'url').startsWith('#') ? _.get(item, 'url') : safePrefix(_.get(item, 'url')))}>{_.get(item, 'title')}</Link>
                    {(_.size(_.get(item, 'items')) > 0) && 
                      <Menu {...this.props} menu={menu} menu_class={'submenu'} page={page} />
                    }
                  </li>
                  )
              })}
            </ul>
        );
    }
}
