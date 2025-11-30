import { useLocation } from "react-router-dom";

export const SigleProductsDetails = () => {
  const { state } = useLocation();

  return (
    <div className="flex items-center justify-center h-screen font-mono bg-gray-100">
      <article className="flex  p-10 max-w-5xl w-full hover:-translate-y-1 transition-transform duration-300">

        <div className="flex-1 pr-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-3">{state.title}</h1>
          <h2 className=" text-xl font-semibold mb-1">Category: {state.category}</h2>
          <h2 className="text-xl font-semibold mb-3">Price: {state.price} $</h2>
          <p className="  text-gray-600 text-xl leading-relaxed">{state.description}</p>
        </div>
        <div className="flex-1 flex justify-center items-center">
           <img
            className="h-150 w-160 object-cover rounded-xl shadow-lg shadow-gray-500 "
            src={state.images[0]}
            alt={state.title}
          />
        </div>

      </article>
    </div>
  );
};
