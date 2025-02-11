import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faLock,
  faChampagneGlasses,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="h-full flex flex-col lg:flex-row items-center justify-center my-12">
      <div className="w-sm lg:ml-24 m-10 lg:mr-0 p-6 bg-[#d05aa4] flex flex-col items-center justify-center rounded-lg lg:rounded-l-lg shadow-2xl">
        <section className="m-4 flex items-center gap-12 text-white">
          <div className="bg-[#d05aa4] text-white text-7xl h-20 w-20 rounded-lg">
            <FontAwesomeIcon icon={faUsers} className="text-red-600" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Connect</h1>
            <p>with your partners</p>
          </div>
        </section>
        <section className="m-4 flex items-center gap-12">
          <div className="bg-[#d05aa4] text-white text-7xl h-20 w-20 rounded-lg">
            <FontAwesomeIcon icon={faLock} className="text-amber-400" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Private</h1>
            <p>chats</p>
          </div>
        </section>
        <section className="m-4 flex items-center gap-12 text-white">
          <div className="bg-[#d05aa4] text-white text-7xl h-20 w-20 rounded-lg">
            <FontAwesomeIcon
              icon={faChampagneGlasses}
              className="text-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Meet</h1>
            <p>with your friends</p>
          </div>
        </section>
      </div>
      <div className="bg-white my-10 max-w-md p-10 rounded-lg text-center shadow-2xl">
        <h1 className="w-full text-slate-600 text-3xl my-4">
          <b>Login</b> or <b>Sign Up</b> with your email address
        </h1>
        {registerErrors.map((error, i) => (
          <div className="text-slate-600" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex flex-col">
          <label className="text-start mx-2 my-2 text-slate-600 font-bold">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full text-slate-600 mb-4 px-4 py-4 border-2 border-zinc-300 rounded-lg outline-none"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-slate-600">Username is required</p>
          )}
          <label className="text-start mx-2 my-2 text-slate-600 font-bold">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full text-slate-600 mb-4  px-4 py-4 border-2 border-zinc-300 rounded-lg outline-none"
            placeholder="Email"
          />
          {errors.email && <p className="text-slate-600">Email is required</p>}
          <label className="text-start mx-2 my-2 text-slate-600 font-bold">
            Password
          </label>
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
            Sign Up
          </button>
        </form>

        <p className="w-full py-2 px-2 text-slate-600">
          Already have an account{" "}
          <b>
            <Link to="/login">Sign In</Link>
          </b>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
