import { Component } from "react";
import { Project } from "../types/project";
import "../css/project-list.css";

class ProjectList extends Component<{
  projects: Project[];
  removeButtonClick: Function;
}> {
  // componentDidUpdate(prevProps: any) {
  //   console.log("hello");
  // }

  render() {
    return (
      <div id="list">
        {this.props.projects.map((project) => (
          <div id="list-item" key={project.projectIdentifier}>
            <button
              className="button"
              onClick={() =>
                this.props.removeButtonClick(project.projectIdentifier)
              }
            >
              X
            </button>
            <div id="name">{project.projectName}</div>
            <div id="start-date">{project.startDate}</div>
            <div id="end-date">{project.endDate}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProjectList;
