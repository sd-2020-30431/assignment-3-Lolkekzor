import React from 'react';

import './PageLayout.css';

import BaseLayout from './BaseLayout';

class PageLayout extends React.Component {
    render() {
        return (
            <BaseLayout>
                <div className="wrapper-inner">
                    {this.props.children}
                </div>
            </BaseLayout>
        )
    }
}

export default PageLayout;
