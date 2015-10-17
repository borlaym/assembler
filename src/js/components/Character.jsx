import React from 'react';

export default React.createClass({

  render() {
    return (
      <div className='character'>
        <img src={this.props.character.thumbnail} />
      </div>
    );
  }
});
