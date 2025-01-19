import axios from "axios";

class ProjectService {
  async addProject(title: string, description: string, imageUrl?: File) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
    try {
      const response = await axios.post(
        "/api/v1/projects/add-project",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      console.error(
        "ProjectService :: getCreatedProjects() :: Error: ",
        err.response.data
      );
      throw err.response.data;
    }
  }

  async getProjects() {
    try {
      const response = await axios.get("/api/v1/projects");
      return response.data;
    } catch (error) {}
  }

  async getProject(projectId: string) {
    try {
      const response = await axios.get(`/api/v1/projects/${projectId}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async deleteProject(projectId?: string) {
    try {
      const response = await axios.delete(`/api/v1/projects/${projectId}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
}

const projectService = new ProjectService();
export default projectService;
