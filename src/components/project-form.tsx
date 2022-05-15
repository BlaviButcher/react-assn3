import { Component } from "react";
import { Project } from "../types/project";

class ProjectForm extends Component<{
  formValues: Project;
  onValueChange: Function;
  onSubmit: Function;
}> {
  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmit();
        }}
      >
        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          id="projectName"
          name="name"
          value={this.props.formValues.projectName}
          onChange={(e) =>
            this.props.onValueChange(e.target.id, e.target.value)
          }
        />
        <label htmlFor="id">Project ID</label>
        <input
          type="text"
          id="projectIdentifier"
          name="id"
          value={this.props.formValues.projectIdentifier}
          onChange={(e) =>
            this.props.onValueChange(e.target.id, e.target.value)
          }
        />
        <label htmlFor="description">Project Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={this.props.formValues.description}
          onChange={(e) =>
            this.props.onValueChange(e.target.id, e.target.value)
          }
        />
        <label htmlFor="start">Start Date</label>
        <input
          type="datetime-local"
          id="startDate"
          name="start"
          value={this.props.formValues.startDate}
          onChange={(e) =>
            this.props.onValueChange(e.target.id, e.target.value)
          }
        />
        <label htmlFor="end">End Date</label>
        <input
          type="datetime-local"
          id="endDate"
          name="end"
          value={this.props.formValues.endDate}
          onChange={(e) =>
            this.props.onValueChange(e.target.id, e.target.value)
          }
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default ProjectForm;
