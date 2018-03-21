import React, { PropTypes } from 'react';
import { TYPE_SECURITY, TYPE_CONTENT } from '../utils/constants'
import Autocomplete from 'react-autocomplete';
import { contentItems } from '../../../../../mock/contentItems.json';
import classNames from 'classnames';

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: '#ff6700',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ff6700'
  }
};
export default class LinkAutofill extends React.Component {

  static propTypes = {
    onSelect: PropTypes.func,
    initialValue: PropTypes.string
  };

  static defaultProps = {
    initialValue: '',
    onChange: () => {},
    onStartEdit: () => {},
    onStopEdit: () => {}
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.initialValue,
      items: [],
      loading: false,
      focused: false
    };
  }

  componentDidMount() {
    fakeRequest(this.state.value, (items) => {
      this.setState({ items, loading: false })
    });
  }

  onChange = (e) => {
    let newVal = e.target.value;
    this.setState({
      value: newVal
    });
    if (this.props.onChange) {
      this.props.onChange(newVal);
    }
  };

  onFocus = (e) => {
    this.setState({ focused: true });
    if (this.props.onStartEdit) {
      this.props.onStartEdit();
    }
  };

  onBlur = (e) => {
    this.setState({ focused: false });
    if (this.props.onStopEdit) {
      this.props.onStopEdit();
    }
  };

  renderItems (items) {
    const typeSecurity = TYPE_SECURITY.toLowerCase();
    const tags = items.filter(item => item.props.type === typeSecurity);
    const content = items.filter(item => item.props.type !== typeSecurity);
    const style = {
      background: '#eee',
      color: '#454545',
      padding: '2px 6px',
      fontWeight: 'bold'
    };
    let results = [];
    if (tags.length) {
      results = results.concat(
        <div style={style}>{TYPE_SECURITY}</div>,
        tags
      );
    }
    if (content.length) {
      results = results.concat(
        <div style={style}>{TYPE_CONTENT}</div>,
        content
      );
    }
    return results;
  }

  render () {
    let classnames = classNames({
      'field-text': true,
      'field__not-empty': !!this.state.value,
      'field__focused': this.state.focused
    });
    return (<div className={classnames}>
      <label className="field__label">
        {this.props.label }
      </label>
      <Autocomplete
        wrapperProps={{className: 'link-autofill'}}
        inputProps={{
          className: 'field-text__input',
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          name: "link-text",
          id: "link-autofill"
        }}
        open
        value={this.state.value}
        items={ this.state.items }
        getItemValue={item => item.title}
        onSelect={(value, item) => {
          this.setState({ value });
          this.props.onSelect(item);
        }}
        onChange={(event, value) => {
          this.setState({ value, loading: true });
          fakeRequest(value, (items) => {
            this.setState({ items, loading: false })
          })
        }}
        renderItem={(item, isHighlighted) => (
          <div
            style={isHighlighted ? styles.highlightedItem : styles.item}
            key={'item-' + item.id}
            id={'item-' + item.id}
            type={item.type}
          >
          {item.title}
          <span className="link-autofill__type">{item.type}</span>
          </div>
        )}
        renderMenu={(items, value, style) => (
          value === '' ? <div /> :
            <div style={{...styles.menu, ...style}}>
              {this.state.loading ? (
                <div style={{padding: 6}}>Loading...</div>
              ) : items.length === 0 ? (
                <div style={{padding: 6}}>No matches for "<i>{value}</i>"</div>
              ) : this.renderItems(items)}
            </div>
        )}
      />
    </div>)
  }
}

function matchToValue (item, value) {
  return (
    item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}

function fakeRequest (value, cb) {
  const typeSecurity = TYPE_SECURITY.toLowerCase();
  // move security type of items to the top of the list
  const results = contentItems.sort((a, b) => {
    const result = (a.type === typeSecurity) - (b.type === typeSecurity) - 0;
    return result;
  });
  if (value === '') {
    return results;
  }
  var items = results.filter((item) => {
    return matchToValue(item, value);
  });
  setTimeout(() => {
    cb(items)
  }, 500)
}