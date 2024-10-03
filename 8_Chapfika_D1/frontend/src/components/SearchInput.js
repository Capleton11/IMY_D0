import React from 'react';

class SearchInput extends React.Component {
  render() {
    const { value, handleSearch, placeholder } = this.props;
    
    return (
      <div style={{ paddingTop: "10%" }}>
        <input 
          type="text"
          value={value}
          onChange={handleSearch}
          placeholder="Search for songs,albums,artists..."
          style={{ width: '250px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
      </div>
    );
  }
}

export default SearchInput;