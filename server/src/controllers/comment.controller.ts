import { Request, Response } from 'express';

import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

import Comment from '../models/comment.model';

const addComment = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.params;
    const { content } = req.body;
    const comment = await Comment.create({
      projectId,
      content,
      createdBy: req.user._id,
    });

    if (!comment) throw new ApiError(400, 'Comment not created');

    const addedComment = await Comment.findOne({ _id: comment._id }).populate(
      'createdBy',
      'firstName lastName'
    );

    res
      .status(201)
      .json(new ApiResponse(201, 'Comment created successfully', addedComment));
  }
);

const getComments = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { projectId } = req.params;
    const comments = await Comment.find({ projectId }).populate(
      'createdBy',
      'firstName lastName'
    );

    if (!comments) throw new ApiError(404, 'Comments not found');

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          'Comments fetched successfully for this project',
          comments
        )
      );
  }
);

const getComment = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.params;
    const comment = await Comment.findOne({ _id }).populate(
      'createdBy',
      'fullName username'
    );

    if (!comment) throw new ApiError(404, 'Comment not found');

    return res
      .status(200)
      .json(new ApiResponse(200, 'Comment fetched successfully', comment));
  }
);

const updateComment = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id },
      { content },
      { new: true }
    );

    if (!comment) throw new ApiError(404, 'Comment not found');

    return res
      .status(200)
      .json(new ApiResponse(200, 'Comment updated successfully', comment));
  }
);

const deleteComment = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.params;
    const comment = await Comment.findOneAndDelete({ _id });

    if (!comment) throw new ApiError(404, 'Comment not found');

    return res
      .status(200)
      .json(new ApiResponse(200, 'Comment deleted successfully', comment));
  }
);

export { addComment, getComments, getComment, updateComment, deleteComment };
