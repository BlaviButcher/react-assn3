import { Component } from "react";
import { Project } from "../types/project";
import Modal from "./modal";
import ProjectList from "./project-list";

class Landing extends Component<
  {},
  { projects: Project[]; loading: boolean; showModal: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      projects: [],
      loading: true,
      showModal: false,
    };
    this.removeProject = this.removeProject.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  componentDidMount() {
    fetch("data.json")
      .then((response) => response.json())
      .then((result) => {
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
        <button
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
        <Modal open={this.state.showModal} onClose={this.closeModal}>
          <div>hello world</div>
        </Modal>
      </div>
    );
  }
}

export default Landing;
