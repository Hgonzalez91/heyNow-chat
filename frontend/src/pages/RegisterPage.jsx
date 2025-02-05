import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white max-w-md p-10 rounded-lg text-center">
        <h1 className="w-full text-slate-600 text-3xl my-4"><b>Login</b> or <b>Sign Up</b> with your email address</h1>
        {registerErrors.map((error, i) => (
          <div className="text-slate-600" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full text-slate-600 my-4 px-4 py-4 border-2 border-zinc-300 rounded-lg outline-none"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-slate-600">Username is required</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full text-slate-600 my-4  px-4 py-4 border-2 border-zinc-300 rounded-lg outline-none"
            placeholder="Email"
          />
          {errors.email && <p className="text-slate-600">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full text-slate-600 my-4  px-4 py-4 border-2 border-zinc-300 rounded-lg outline-none"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-slate-600">Password is required</p>
          )}
          <button
            type="submit"
            className="bg-[#73318b] w-full my-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-[#5A256E]"
          >
            Sign Up
          </button>
        </form>
        
        <p className="w-full py-2 px-2 text-slate-600">Already have an account <b><Link to='/login'>Sign In</Link></b></p>
      </div>
    </div>
  );
}

export default RegisterPage;
