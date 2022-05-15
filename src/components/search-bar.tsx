import { Component } from "react";
import "../css/search-bar.css";

class SearchBar extends Component<
  { onSearch: Function; searchTerm: string; filter: Function },
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

  onFilter() {
    let filter = document.getElementById("select-filter") as HTMLSelectElement;
    let order = document.getElementById("select-order") as HTMLSelectElement;
    this.props.filter(filter.value, order.value);
  }

  render() {
    return (
      <form className="search-bar">
        <select
          name="filters"
          id="select-filter"
          onChange={() => this.onFilter()}
        >
          <option value="name">Project Name</option>
          <option value="date">Start Date</option>
        </select>
        <select name="order" id="select-order" onChange={() => this.onFilter()}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
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
