import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProducts } from "../../app.store/slice/adminslice";
import { useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const AdminProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [limit]= useState(5);
  const [skip,setSkip]= useState(0);

  // const [page, setPage] = useState(1);
  // const limit = 8;
  // const skip = (page - 1) * limit;


  const getProducts = async () => {
    const res = await fetch(`http://localhost:3001/product?_limit=${limit}&_start=${skip}`);
    return res.json();
  };

  const { data = [], isLoading, error  } = useQuery({
    queryKey: ["admin-products", limit,skip],
    queryFn: getProducts,
    placeholderData: keepPreviousData,
  });

  const handleDelete = (id) => {
    dispatch(deleteProducts(id));
  };

  const handleAddProducts = () => {
    navigate("/addproducts");
  };
  const handleMove=(moveCount)=>{
    setSkip((prevSkip)=>Math.max(prevSkip+moveCount,0))
  }

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>{error.message}</p>;



  return (
    <div className="p-4">
      <button
        className="items-center justify-center pr-5 font-semibold bg-gray-100 rounded shadow-2xl"
        onClick={handleAddProducts}
      >
        Add New Product
      </button>

      <section className="grid grid-cols-4 gap-2 mt-4">
        {(data?.products || data)?.map((product) => (
          <article
            key={product.id}
            className="w-60 p-2 bg-white rounded-xl font-semibold hover:scale-107 hover:-translate-y-1 transition-transform duration-300"
          >
            <img
              className="h-40 object-cover rounded-xl"
              src={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "https://via.placeholder.com/150"
              }
              alt={product.title}
            />

            <h1 className="font-bold text-lg">{product.title}</h1>
            <h2 className="font-semibold">Category: {product.category}</h2>
            <h2 className="font-semibold">Price: ${product.price}</h2>
            <h2 className="font-semibold">Quantity: {product.stock} pcs</h2>
            <h2 className="text-sm text-gray-600 p-1">{product.description}</h2>

            <button
              className="pr-5"
              onClick={() => navigate("/editproducts", { state: product })}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </article>
        ))}
      </section>

      <div className="flex justify-center gap-3 mt-6">
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          // disabled={page === 1}
          onClick={() => handleMove(-limit)}
        >
          Prev
        </button>

        {/* <span className="font-semibold">
          {page} / {totalPages}
        </span> */}

        <button
          className="px-3 py-1 bg-gray-300 rounded"
          // disabled={page === totalPages}
          onClick={() => handleMove(limit)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
