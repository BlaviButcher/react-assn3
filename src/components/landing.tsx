import { Component } from "react";
import { Project } from "../types/project";
import Modal from "./modal";
import ProjectForm from "./project-form";
import ProjectList from "./project-list";
import "../css/landing.css";
import SearchBar from "./search-bar";

// TODO: shift what function you can into components - a lot of lifted state makes it hard to keep things contained
// TODO: fix add project on search
// TODO: have some eternal project id state

class Landing extends Component<
  {},
  {
    projects: Project[];
    loading: boolean;
    showModal: boolean;
    formProject: Project;
    visibleProjects: Project[];
    search: string;
    refreshSearch: Boolean;
    refreshFilter: Boolean;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      // holds all projects - even if not shown
      projects: [],
      // the projects that can be seen
      visibleProjects: [],
      // Are we loading
      loading: true,
      // is modal shown
      showModal: false,
      // data help in the form
      formProject: {
        projectIdentifier: "",
        projectName: "",
        startDate: "",
        endDate: "",
        description: "",
      },
      // search value
      search: "",
      // Should we refresh the visible projects
      refreshSearch: false,
      refreshFilter: false,
    };

    // BOUND
    this.removeProject = this.removeProject.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.addProjectFromForm = this.addProjectFromForm.bind(this);
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.filterResults = this.filterResults.bind(this);
  }

  // self explanatory
  closeModal() {
    this.setModal(false);
  }

  // update search value and preform a search, updating the visible projects
  onSearchValueChange(value: string) {
    this.setState({ search: value });
    let newProjects = this.state.projects.filter((project) => {
      return project.projectName.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({ visibleProjects: newProjects });
    // refresh search can be called from anywhere, it allows us to run this search function if we just want to refresh after adding something or deleting etc
    // if it's not set to false we get a loop
    this.setState({ refreshSearch: false });
    this.setState({ refreshFilter: true });
  }

  // set modal to given value - could be called openModal and we remove the other. One will become an artifact during refactor
  setModal(status: boolean) {
    this.setState({ showModal: status });
  }

  // removes a project given an id
  removeProject(projectIdentifier: string) {
    const projects = this.state.projects.filter(
      (project) => project.projectIdentifier !== projectIdentifier
    );
    // we unfortunately cannot copy as they both could have different contents
    // In future refactor will copy one to the other then call searchRefresh to filter by search again and get
    // new set of visible projects
    const visibleProjects = this.state.visibleProjects.filter(
      (project) => project.projectIdentifier !== projectIdentifier
    );

    this.setState({ projects });
    this.setState({ visibleProjects });
  }

  componentDidMount() {
    // Get the data when component mounts
    fetch("data.json")
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          projects: result,
          loading: false,
          visibleProjects: result,
        });
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
    // get copy of current projects
    const projects = [...this.state.projects];
    let projectIDs: string[] = projects.map(
      (project) => project.projectIdentifier
    );

    // get entered project from form
    let data: Project = { ...this.state.formProject };

    // if project id already exists
    if (projectIDs.includes(data.projectIdentifier)) {
      alert("Project ID already exists");
      return;
    }

    // remove the T from datetime
    let startDate: string = data.startDate;
    let endDate: string = data.endDate;
    startDate = startDate.replace("T", " ");
    endDate = endDate.replace("T", " ");

    data.startDate = startDate;
    data.endDate = endDate;

    // push new project to projects
    projects.push(data);
    // update state of projects
    this.setState({ projects });
    // research to update visible projects
    this.setState({ refreshSearch: true });
    this.closeModal();
    this.clearFormState();
  }

  // filter results based on dropdowns selected - doesn't implement date sorting
  filterResults(column: string, order: string) {
    let projects = this.state.visibleProjects;
    let sortedProjects: Project[] = [];
    console.log(column);
    if (column === "name") {
      sortedProjects = projects.sort((a, b) => {
        if (order === "asc") {
          return a.projectName.toLocaleLowerCase() >
            b.projectName.toLocaleLowerCase()
            ? 1
            : -1;
        }
        // if descending
        return a.projectName.toLocaleLowerCase() <
          b.projectName.toLocaleLowerCase()
          ? 1
          : -1;
      });
    }
    // else is date
    else {
      sortedProjects = projects.sort((a, b) => {
        if (order === "asc") {
          // if descending
          if (new Date(b.startDate).getTime() < new Date(a.startDate).getTime())
            return 1;
          if (new Date(b.startDate).getTime() > new Date(a.startDate).getTime())
            return -1;
          return 0;
        }
        // if descending
        if (new Date(b.startDate).getTime() < new Date(a.startDate).getTime())
          return -1;
        if (new Date(b.startDate).getTime() > new Date(a.startDate).getTime())
          return 1;
        return 0;
      });
    }
    this.setState({ visibleProjects: sortedProjects });
    this.setState({ refreshFilter: false });
  }

  // update projects to given projects
  updateVisibleProjects(projects: Project[]) {
    this.setState({ visibleProjects: projects });
  }

  // update form data when fields are change to keep sync
  updateFormData(target: string, value: any) {
    let oldData: Project = { ...this.state.formProject };

    // There must be a better way
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
          }}
        >
          Create New Project
        </button>
        <SearchBar
          onSearch={this.onSearchValueChange}
          searchTerm={this.state.search}
          filter={this.filterResults}
          refreshSearch={this.state.refreshSearch}
          refreshFilter={this.state.refreshFilter}
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
