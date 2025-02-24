import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNotification } from "../../../hooks/NotificationProvider";

import Card from "../../../styles/theme/custom/Card";
import { GoogleIcon, FacebookIcon } from "../../../assets/icons/CustomIcons";
import { authService } from "../../../services";
import { registerUserSchema } from "../../../schema/userSchema";
import { User } from "../../../types/api";

type FormData = z.infer<typeof registerUserSchema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { showSuccess, showError } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    resolver: zodResolver(registerUserSchema),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<FormData> = async (
    user: User
  ): Promise<any> => {
    console.log("RegisterUserForm :: onSubmit() :: User: ", user);
    try {
      const response = await authService.register(user);

      showSuccess(response.message);
      navigate("/login");
    } catch (error: any) {
      showError(error.message);
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="firstName">First name</FormLabel>
            <TextField
              autoComplete="given-name"
              id="firstName"
              placeholder="Jon"
              {...register("firstName")}
              error={errors.firstName ? true : false}
              helperText={errors.firstName?.message}
              color={errors.firstName ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <TextField
              autoComplete="family-name"
              id="lastName"
              placeholder="Snow"
              {...register("lastName")}
              error={errors.lastName ? true : false}
              helperText={errors.lastName?.message}
              color={errors.lastName ? "error" : "primary"}
            />
          </FormControl>
        </Box>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            fullWidth
            id="email"
            placeholder="your@email.com"
            autoComplete="email"
            variant="outlined"
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            color={errors.email ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            fullWidth
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            variant="outlined"
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            color={errors.password ? "error" : "primary"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="small"
                      sx={{
                        color: "text.secondary", // Adjust for dark theme
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle hover effect
                          color: "primary.main", // Brighter on hover
                        },
                        padding: "8px",
                        borderRadius: "50%",
                        border: "none",
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Conform Password</FormLabel>
          <TextField
            fullWidth
            placeholder="••••••"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            variant="outlined"
            {...register("confirmPassword")}
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword?.message}
            color={errors.confirmPassword ? "error" : "primary"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="small"
                      sx={{
                        border: "none",
                        borderRadius: "0 4px 4px 0",
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="primary" />}
          label="I want to receive updates via email."
        />
        <Button type="submit" fullWidth variant="contained">
          Register
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <span>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Login
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>
        <Typography sx={{ color: "text.secondary" }}>or</Typography>
      </Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign up with Google")}
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign up with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Sign up with Facebook
        </Button>
      </Box>
    </Card>
  );
}
