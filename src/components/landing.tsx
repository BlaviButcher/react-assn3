import { Component } from "react";
import { Project } from "../types/project";
import Modal from "./modal";
import ProjectForm from "./project-form";
import ProjectList from "./project-list";

class Landing extends Component<
  {},
  {
    projects: Project[];
    loading: boolean;
    showModal: boolean;
    formProject: Project;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      projects: [],
      loading: true,
      showModal: false,
      formProject: {
        projectIdentifier: "",
        projectName: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    };
    this.removeProject = this.removeProject.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.parseProjectForm = this.parseProjectForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.addProjectFromForm = this.addProjectFromForm.bind(this);
  }

  closeModal() {
    this.setModal(false);
  }

  setModal(status: boolean) {
    this.setState({ showModal: status });
  }

  removeProject(projectIdentifier: string) {
    const projects = this.state.projects.filter(
      (project) => project.projectIdentifier !== projectIdentifier
    );
    this.setState({ projects });
  }

  parseProjectForm(form: HTMLFormElement) {
    console.log(form.elements);
  }

  componentDidMount() {
    fetch("data.json")
      .then((response) => response.json())
      .then((result) => {
        this.setState({ projects: result, loading: false });
      });
  }

  clearFormState() {
    this.setState({
      formProject: {
        projectIdentifier: "",
        projectName: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    });
  }

  addProjectFromForm() {
    const projects = [...this.state.projects];
    projects.push(this.state.formProject);
    this.setState({ projects });
    this.closeModal();
    this.clearFormState();
  }

  // update form data when fields are change to keep sync
  updateFormData(target: string, value: any) {
    let oldData: Project = { ...this.state.formProject };

    switch (target) {
      case "projectIdentifier":
        oldData.projectIdentifier = value;
        break;
      case "projectName":
        oldData.projectName = value;
        break;
      case "startDate":
        oldData.startDate = value;
        break;
      case "endDate":
        oldData.endDate = value;
        break;
      case "description":
        oldData.description = value;
        break;
      default:
        break;
    }

    this.setState({ formProject: oldData });
  }

  render() {
    if (this.state.loading) {
      // TODO: Add Loader Component
      return <div>Loading</div>;
    }
    return (
      <div>
        <h1>Projects</h1>
        <button
          id="centered-toggle-button"
          className="toggle-button"
          onClick={() => {
            this.setModal(true);
            console.log("set Modal");
          }}
        >
          Create New Project
        </button>
        <ProjectList
          projects={this.state.projects}
          removeButtonClick={this.removeProject}
        />
        <Modal
          open={this.state.showModal}
          onClose={this.closeModal}
          title="Create Project"
        >
          <ProjectForm
            formValues={this.state.formProject}
            onValueChange={this.updateFormData}
            onSubmit={this.addProjectFromForm}
          />
        </Modal>
      </div>
    );
  }
}

export default Landing;
