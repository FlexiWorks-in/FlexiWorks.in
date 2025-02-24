import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Card,
  CardActions,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useDispatch } from "react-redux";

import RealTimeEditor from "./RealTimeEditor/RealTimeEditor";
import { useNotification } from "../hooks/NotificationProvider";

import { AppDispatch } from "../app/store";
import { addProject } from "../app/features/projectSlice";
import { projectSchema } from "../schema/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

interface FormData {
  title: string;
  description: string;
  image: FileList | null;
  fileName?: string;
}

interface ProjectFormProps {
  toggleProjectForm: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ toggleProjectForm }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showSuccess, showError } = useNotification();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
    resolver: zodResolver(projectSchema),
  });

  const file = watch("image");

  const onSubmit = (formData: FormData) => {
    const imageFile = formData.image ? formData.image[0] : undefined;
    console.log("imageFile", imageFile);
    dispatch(
      addProject({
        title: formData.title,
        description: formData.description,
        imageUrl: imageFile,
      })
    )
      .unwrap()
      .then((response) => {
        console.log(response);
        showSuccess(response.message);
        toggleProjectForm();
      })
      .catch((error) => {
        console.log(error);
        showError(error.message);
      });
  };

  const onCancel = () => {
    toggleProjectForm();
  };

  return (
    <>
      <Card
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Stack spacing={2} marginTop={2}>
          <FormControl>
            <FormLabel htmlFor="title" sx={{ display: "flex" }}>
              Title
              <Typography color="error" style={{ marginLeft: 4 }}>
                *
              </Typography>
            </FormLabel>
            <TextField
              id="title"
              variant="outlined"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </FormControl>
          <FormControl>
            <FormLabel sx={{ display: "flex" }}>
              Description
              <Typography color="error" style={{ marginLeft: 4 }}>
                *
              </Typography>
            </FormLabel>
            <RealTimeEditor name="description" control={control} />
            {errors.description && (
              <FormHelperText error>
                {errors.description.message}
              </FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              disabled
              variant="outlined"
              value={file ? file[0]?.name : ""}
              placeholder="No file selected"
              slotProps={{ input: { readOnly: true } }}
            />

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="file-input"
              type="file"
              {...register("image")}
            />
            <label htmlFor="file-input">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
          </Box>
        </Stack>

        <FormControl
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "row",
            ml: "auto",
            gap: 1,
          }}
        >
          <CardActions>
            <Button type="reset" variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </CardActions>
        </FormControl>
      </Card>
    </>
  );
};

export default ProjectForm;
