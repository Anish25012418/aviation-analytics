import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white mt-10">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1
            className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">Something's
            missing.</p>
          <p className="mb-4 text-lg font-light text-gray-500 ">Sorry, we can't find that page. You'll
            find lots to explore on the home page. </p>
          <button onClick={() => navigate("/")}
                  className="px-10 py-4 mt-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm cursor-pointer">
            Go back to homepage
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;