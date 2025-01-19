import axios from "axios";

class CommentService {
  async addComment(projectId: string, content: string) {
    try {
      const response = await axios.post(`/api/v1/comments/${projectId}`, {
        content,
      });
      return response.data;
    } catch (err: any) {
      console.error(
        "CommentService :: createComment() :: Error: ",
        err.response.data
      );
      throw err.response.data;
    }
  }

  async getComments(projectId: string) {
    try {
      const response = await axios.get(`/api/v1/comments/${projectId}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async deleteComment(commentId?: string) {
    try {
      const response = await axios.delete(`/api/v1/comments/${commentId}`);
      return response.data;
    } catch (error: any) {
      console.log(
        "CommentService :: deleteComment() :: Error: ",
        error.response.data
      );
      throw error.response.data;
    }
  }

  async updateComment(commentId?: string, content?: string) {
    try {
      const response = await axios.put(`/api/v1/comments/${commentId}`, {
        content,
      });
      return response.data;
    } catch (error: any) {
      console.log(
        "CommentService :: updateComment() :: Error: ",
        error.response.data
      );
      throw error.response.data;
    }
  }
}

const commentService = new CommentService();

export default commentService;
