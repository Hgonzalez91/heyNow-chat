import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className=" mb-3 flex justify-between items-center py-5 px-10">
      <Link to="/">
        <h1 className="text-3xl font-bold">HeyNow</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="bg-[#ff9e56] w-full font-bold my-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-[#DC7F39]"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="bg-[#ff9e56] w-full font-bold my-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-[#DC7F39]"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-[#ff9e56] w-full font-bold my-4 px-4 py-4 rounded-lg cursor-pointer hover:bg-[#DC7F39]"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
