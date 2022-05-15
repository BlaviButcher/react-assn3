import { Component } from "react";
import "../css/search-bar.css";

class SearchBar extends Component<
  { onSearch: Function; searchTerm: string },
  { searchTerm: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchTerm: this.props.searchTerm,
    };
  }

  clear() {
    this.props.onSearch("");
  }

  render() {
    return (
      <form className="search-bar">
        <input
          value={this.state.searchTerm}
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={(e) => {
            this.setState({ searchTerm: e.target.value });
            this.props.onSearch(e.target.value);
          }}
        />
        <button
          type="submit"
          className="search-button"
          onClick={(e) => {
            e.preventDefault();
            this.clear();
          }}
        >
          <img className="search-icon" src="cancel-icon.svg" alt="" />
        </button>
      </form>
    );
  }
}

export default SearchBar;
