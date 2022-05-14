import { Component } from "react";
import { Project } from "../types/project";

class ProjectList extends Component<{
  projects: Project[];
  removeButtonClick: Function;
}> {
  render() {
    return (
      <div>
        {this.props.projects.map((project) => (
          <div key={project.projectIdentifier}>
            <button
              onClick={() =>
                this.props.removeButtonClick(project.projectIdentifier)
              }
            >
              X
            </button>
            <div>{project.projectName}</div>
            <div>{project.start_date}</div>
            <div>{project.end_date}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProjectList;
