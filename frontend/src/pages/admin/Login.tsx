import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import "../../styles/pages/admin/Login.scss"
import { loginAdmin } from "../../api/admin";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginAdmin(email, password);

      // Store the token (assuming response contains a token)
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        navigate("/admin/events"); // Redirect after login
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  const onSubmit = (data: LoginForm) => {
    handleLogin(data.email, data.password);
  };

  return (
    <Container className="login-container" maxWidth={false}>
      <Container className="login-container-inside" maxWidth="xs">
        <Paper elevation={6} className="login-box">
          <Typography className="login-title" variant="h5">
            Welcome Back 👋
          </Typography>
          <Typography className="login-subtitle" variant="body2">
            Sign in to manage your events
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" className="login-button">
              Login
            </Button>
          </form>

          <Box className="login-footer">
            <Button
              className="link-button"
              onClick={() => navigate("/register")}
            >
              New Admin? <span>&nbsp;Register Here</span>
            </Button>
            <Button className="link-button" onClick={() => navigate("/events")}>
              View Events as <span>&nbsp;User</span>
            </Button>
          </Box>
        </Paper>
      </Container>
    </Container>
  );
};

export default Login;
