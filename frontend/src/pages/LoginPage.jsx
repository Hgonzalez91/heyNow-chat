import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    <div className="h-screen flex items-center justify-center my-12">
      <div className="bg-white max-w-md p-10 rounded-lg text-center">
        <h1 className="w-full text-slate-600 text-3xl my-4">
          <b>Login</b> or <b>Sign Up</b> with your email address
        </h1>
        {signinErrors.map((error, i) => (
          <div className="text-slate-600" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex flex-col">
          <label className="text-start mx-2 my-2 text-slate-600 font-bold">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full text-slate-600 mb-4  px-4 py-4 border-2 border-zinc-300 rounded-lg outline-none"
            placeholder="Email"
          />
          {errors.email && <p className="text-slate-600">Email is required</p>}
          <label className="text-start mx-2 my-2 text-slate-600 font-bold">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full text-slate-600 mb-4  px-4 py-4 border-2 border-zinc-300 rounded-lg outline-none"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-slate-600">Password is required</p>
          )}
          <button
            type="submit"
            className="bg-[#73318b] w-full my-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-[#5A256E]"
          >
            Sign In
          </button>
        </form>
        <p className="text-slate-600">
          Don't you have an account{" "}
          <b>
            <Link to="/register">Sign Up</Link>
          </b>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
