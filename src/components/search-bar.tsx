import { Component } from "react";
import "../css/search-bar.css";
import { Project } from "../types/project";

class SearchBar extends Component<
  { projects: Project[]; onProjectChange: Function },
  { searchTerm: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  onValueChage(value: string) {
    this.setState({ searchTerm: value });
    let newProjects = this.props.projects.filter((project) => {
      return project.projectName.toLowerCase().includes(value.toLowerCase());
    });
    this.props.onProjectChange(newProjects);
  }

  clear() {
    this.onValueChage("");
  }

  render() {
    return (
      <form className="search-bar">
        <input
          value={this.state.searchTerm}
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={(e) => this.onValueChage(e.target.value)}
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
