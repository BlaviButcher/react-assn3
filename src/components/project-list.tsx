import { Component } from "react";
import { Project } from "../types/project";

class ProjectList extends Component<{ projects: Project[] }> {
  render() {
    return (
      <div>
        {this.props.projects.map((project) => (
          <div key={project.projectIdentifier}>
            <div>{project.projectName}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProjectList;
