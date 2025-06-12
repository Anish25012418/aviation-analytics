import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="h-full flex flex-col shadow-sm">
      <div className="py-2 flex justify-between items-center">
        <img src="/logo-light.png" alt="logo" className="w-70 lg:w-90 cursor-pointer" onClick={() => navigate("/")}/>
      </div>
    </nav>
  );
};

export default Navbar;