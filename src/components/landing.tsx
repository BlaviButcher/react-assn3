import { Component } from "react";
import { Project } from "../types/project";
import ProjectList from "./project-list";

class Landing extends Component<{}, { projects: Project[]; loading: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      projects: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch("data.json")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({ projects: result, loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      // TODO: Add Loader Component
      return <div>Loading</div>;
    }
    return (
      <div>
        <h1>Projects</h1>
        <button>Create New Project</button>
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}

export default Landing;
