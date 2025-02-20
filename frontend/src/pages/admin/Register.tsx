import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import "../../styles/pages/admin/Register.scss"
import { registerAdmin } from "../../api/admin";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await registerAdmin(data.name, data.email, data.password);
      alert("Registration successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      console.error("Registration Error:", errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <Container className="register-container" maxWidth="xl">
      <Container className="register-container-inside" maxWidth="xs">
        <Paper elevation={6} className="register-box">
          <Typography className="register-title" variant="h5">
            Create an Account 🎉
          </Typography>
          <Typography className="register-subtitle" variant="body2">
            Sign up to manage events
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              variant="contained"
              className="register-button"
            >
              Register
            </Button>
          </form>

          <Typography className="register-footer" variant="body2">
            Already have an account?
            <Button className="link-button" onClick={() => navigate("/login")}>
              Login Here
            </Button>
          </Typography>
        </Paper>
      </Container>
    </Container>
  );
};

export default Register;
