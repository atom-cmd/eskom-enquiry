import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';
import { defineMessages, injectIntl, FormattedMessage, FormattedNumber } from 'react-intl';
import numeral from 'numeral';
import { ControlGroup, InputGroup, Button, Intent } from "@blueprintjs/core";

import { fetchStatistics } from 'src/actions/index';
import { Screen } from 'src/components/common';

import './HomeScreen.css';

const messages = defineMessages({
  title: {
    id: 'home.title',
    defaultMessage: 'Find public records',
  },
  search_placeholder: {
    id: 'home.search_placeholder',
    defaultMessage: 'Try searching: {samples}',
  },
  home_search: {
    id: 'home.search',
    defaultMessage: 'Search',
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchStatistics();
  }

  onChange({target}) {
    this.setState({value: target.value})
  }

  onSubmit(event) {
    event.preventDefault();
    const { history } = this.props;
    history.push({
      pathname: '/search',
      search: queryString.stringify({
        q: this.state.value
      })
    });
  }

  render() {
    const { intl, metadata, statistics } = this.props;
    const samples = metadata.app.samples.join(', ');

    return (
      <Screen isHomepage={true} title={intl.formatMessage(messages.title)}>
        <section className='HomePage'>
          <div className='outer-searchbox'>
            <div className='inner-searchbox'>
              <div className='homepage-summary'>
              <FormattedMessage id='home.summary'
                                defaultMessage="Search {total} public records"
                                values={{
                                  total: statistics.entities ? numeral(statistics.entities).format('0a') : "",
                                  collections: statistics.collections ? <FormattedNumber value={statistics.collections} /> : "many"
                                }} />
              </div>
              <form onSubmit={this.onSubmit} className="search-form">
                <ControlGroup fill={true}>
                  <InputGroup
                    type="text"
                    leftIcon="search"
                    className="pt-large"
                    autoFocus={true}
                    onChange={this.onChange} value={this.state.value}
                    placeholder={intl.formatMessage(messages.search_placeholder, { samples })}
                  />
                  <Button
                    className="pt-large pt-fixed"
                    intent={Intent.PRIMARY}
                    onClick={this.onSubmit}
                    text={
                      <React.Fragment>
                        {intl.formatMessage(messages.home_search)}
                      </React.Fragment>
                    }
                  />
                </ControlGroup>
              </form>
              <div className="homepage-blurb-container">
                <div className="homepage-blurb">The South African Parliament's Portfolio Committee on Public Enterprises conducted an inquiry into allegations of State Capture at the state-owned electricity company Eskom between October 2017 and March 2018. This is an archive of the evidence heard by and submitted to the Committee in support of their mission.</div>
              </div>
            </div>
          </div>
        </section>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  statistics: state.statistics,
  metadata: state.metadata
});

HomeScreen = injectIntl(HomeScreen);
export default connect(mapStateToProps, { fetchStatistics })(HomeScreen);
