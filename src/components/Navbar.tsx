import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="h-16 w-full flex items-center shadow-sm bg-white">
        <img src="/logo-light.png" alt="logo" className="w-70 lg:w-90 cursor-pointer" onClick={() => navigate("/")}/>
    </nav>
  );
};

export default Navbar;