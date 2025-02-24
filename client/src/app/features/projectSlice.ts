import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Project } from "../../types/api";
import { projectService } from "../../services";

interface ProjectState {
  loading: boolean;
  projects: Project[];
  project: Project | null;
  error: unknown;
}

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectService.getProjects();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (
    {
      title,
      description,
      imageUrl,
    }: {
      title: string;
      description: string;
      imageUrl?: File;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await projectService.addProject(
        title,
        description,
        imageUrl
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getProject = createAsyncThunk(
  "projects/getProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await projectService.getProject(projectId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await projectService.deleteProject(projectId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ProjectState = {
  loading: false,
  error: null,
  projects: [],
  project: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
