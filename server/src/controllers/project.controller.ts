import { Request, Response } from 'express';

import Project from '../models/project.model';

import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

const addProject = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    console.log('Project controller:: body: ', body);
    const project = await Project.create({
      title: body.title,
      description: body.description,
      createdBy: req.user._id,
      budget: body.budget,
    });

    if (!project) throw new ApiError(400, 'Project not created');

    const addedProject = await Project.findOne({ _id: project._id }).populate(
      'createdBy',
      'firstName lastName'
    );

    res
      .status(201)
      .json(new ApiResponse(201, 'Project created successfully', addedProject));
  }
);

const getProjects = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const projects = await Project.find({}).populate(
      'createdBy',
      'firstName lastName'
    );

    if (!projects) {
      throw new ApiError(404, 'Projects not found');
    }

    res
      .status(200)
      .json(new ApiResponse(200, 'Projects fetched successfully', projects));
  }
);

const getProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.params;
    const project = await Project.findOne({ _id }).populate(
      'createdBy',
      'firstName lastName'
    );

    if (!project) throw new ApiError(404, 'Project not found');

    return res
      .status(200)
      .json(new ApiResponse(200, 'Project fetched successfully', project));
  }
);

const updateProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.params;
    const project = await Project.findOne({ _id });

    if (!project) throw new ApiError(404, 'Project not found');

    project.description = req.body.description;

    if (req.file) project.projectImage = req.file.path;

    await project.save();

    return res
      .status(200)
      .json(new ApiResponse(200, 'Project updated successfully', project));
  }
);

const deleteProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.params;
    const project = await Project.findOne({ _id });

    if (!project) throw new ApiError(404, 'Project not found');

    await project.deleteOne({ _id });

    return res
      .status(200)
      .json(new ApiResponse(200, 'Project deleted successfully', _id));
  }
);

export { addProject, getProjects, getProject, updateProject, deleteProject };
