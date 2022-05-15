import { Component } from "react";
import { Project } from "../types/project";
import Modal from "./modal";
import ProjectForm from "./project-form";
import ProjectList from "./project-list";
import "../css/landing.css";
import SearchBar from "./search-bar";

// TODO: shift what function you can into components - a lot of lifted state makes it hard to keep things contained
// TODO: fix add project on search

class Landing extends Component<
  {},
  {
    projects: Project[];
    loading: boolean;
    showModal: boolean;
    formProject: Project;
    visibleProjects: Project[];
    search: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      projects: [],
      visibleProjects: [],
      loading: true,
      showModal: false,
      formProject: {
        projectIdentifier: "",
        projectName: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      search: "",
    };

    this.removeProject = this.removeProject.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.addProjectFromForm = this.addProjectFromForm.bind(this);
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
  }

  closeModal() {
    this.setModal(false);
  }

  onSearchValueChange(value: string) {
    this.setState({ search: value });
    let newProjects = this.state.projects.filter((project) => {
      return project.projectName.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({ visibleProjects: newProjects });
  }

  setModal(status: boolean) {
    this.setState({ showModal: status });
  }

  removeProject(projectIdentifier: string) {
    const projects = this.state.projects.filter(
      (project) => project.projectIdentifier !== projectIdentifier
    );
    const visibleProjects = this.state.visibleProjects.filter(
      (project) => project.projectIdentifier !== projectIdentifier
    );

    this.setState({ projects });
    this.setState({ visibleProjects });
  }

  componentDidMount() {
    fetch("data.json")
      .then((response) => response.json())
      .then((result) => {
        this.setState({ projects: result, loading: false });
        this.setState({ visibleProjects: result });
      });
  }

  // clears form state
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

  // gets project from form and updates current projects
  addProjectFromForm() {
    const projects = [...this.state.projects];

    // remove the T from datetime
    let data: Project = { ...this.state.formProject };
    let startDate: string = data.startDate;
    let endDate: string = data.endDate;
    startDate = startDate.replace("T", " ");
    endDate = endDate.replace("T", " ");

    data.startDate = startDate;
    data.endDate = endDate;

    projects.push(data);
    this.setState({ projects });
    this.closeModal();
    this.clearFormState();
  }

  // update projects to given projects
  updateVisibleProjects(projects: Project[]) {
    this.setState({ visibleProjects: projects });
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
      <div id="main">
        <h1>Projects</h1>
        <button
          id="project-button"
          className="button"
          onClick={() => {
            this.setModal(true);
            console.log("set Modal");
          }}
        >
          Create New Project
        </button>
        <SearchBar
          onSearch={this.onSearchValueChange}
          searchTerm={this.state.search}
        />
        <ProjectList
          projects={this.state.visibleProjects}
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
