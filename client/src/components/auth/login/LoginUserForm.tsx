import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon } from "../../../assets/icons/CustomIcons";
import Card from "../../../styles/theme/custom/Card";

// import { useNotification } from "../../../hooks/NotificationProvider";

import { login } from "../../../app/features/authSlice";
import store from "../../../app/store";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password should have at least 8 characters"),
});

const LoginForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<typeof store.dispatch>();
  // const { showSuccess, showError } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
  //   user
  // ) => {
  //   const { email, password } = user;

  //   try {
  //     const response = await authService.login(email, password);
  //     console.log(response);
  //     dispatch(login({ user: response.data.user }));

  //     showSuccess(response.message);
  //     navigate("/");
  //   } catch (error: any) {
  //     showError(error.message);
  //   }
  // };

  const onSubmit: SubmitHandler<{ email: string; password: string }> = (
    user
  ) => {
    const { email, password } = user;

    dispatch(login({ email, password }));
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            color={errors.email ? "error" : "primary"}
            sx={{ ariaLabel: "email" }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            color={errors.password ? "error" : "primary"}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained">
          Login
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <span>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Register
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
};

export default LoginForm;
