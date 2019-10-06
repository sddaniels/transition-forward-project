import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {safePrefix} from '../utils';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        const frontmatterTitle = _.get(this.props, 'pageContext.frontmatter.title') && _.get(this.props, 'pageContext.frontmatter.title') + ' | ';
        const siteTitle = _.get(this.props, 'pageContext.site.siteMetadata.title');
        const title = frontmatterTitle + siteTitle;

        const description = _.get(this.props, 'pageContext.frontmatter.excerpt') || _.get(this.props, 'pageContext.site.siteMetadata.metaDescription');
        const location = this.props.location.origin + this.props.location.pathname;
        const ogImage = this.props.location.origin + '/images/workshop-opengraph.jpg';

        return (
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />

                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                    <link rel="manifest" href="/favicon/site.webmanifest" />
                    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#092a49" />
                    <link rel="shortcut icon" href="/favicon/favicon.ico" />
                    <meta name="msapplication-TileColor" content="#e4f8ff" />
                    <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
                    <meta name="theme-color" content="#ffffff" />

                    <meta name="description" content={description} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:image" content={ogImage} />
                    <meta property="og:title" content={title} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={location} />
                    <meta property="og:image" content={ogImage} />
                    <meta property="og:description" content={description} />
                    <meta property="og:site_name" content={siteTitle} />

                    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i%26Display=swap" rel="stylesheet"/>
                    <link rel="stylesheet" href={safePrefix('assets/css/main.css')}/>
                </Helmet>
                <div id="page" className="site">
                  <Header {...this.props} />
                  <main id="content" className="site-content">
                    {this.props.children}
                  </main>
                  <Footer {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}
