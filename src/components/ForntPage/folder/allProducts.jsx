import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import debounce from "lodash.debounce";


export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams({ skip: 0, limit: 8 });

  const skip = parseInt(searchParams.get("skip") || 0);
  const limit = parseInt(searchParams.get("limit") || 5);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", skip, limit, q, category],
    queryFn: async () => {
      let url = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`;
      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}&q=${q}`;
      }
      const data = await fetch(url).then((res) => res.json());
      return data.products;
    },
    placeholderData: keepPreviousData,
    staleTime: 20000,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/products/categories");
      return res.json();
    },
  });

  const handleMove = (moveCount) => {
    setSearchParams((prev) => {
      prev.set("skip", Math.max(skip + moveCount, 0));
      return prev;
    });
  };

  if (isLoading) return(
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
    </div>
  );;

  return (
    <div className="p-4 ">
     <div className=" flex gap-[1150px] ml-20 mb-10 ">
      <div className=" border outline-none w-[14%] h-[30px] gap-1.5 rounded-xl mb-3 flex items-center">

      <IoMdSearch  className=" ml-2"/>  
      <input
      className="border-none outline-none focus:border-none focus:outline-none"
        type="text"
        placeholder="Search here.."
        onChange={debounce((event) => {
          setSearchParams((prev) => {
            prev.set("q", event.target.value);
            prev.set("skip", 0);
            prev.delete('category');
            return prev;
          });
        }, 1000)}
        
      />
      </div>
      <select
      
        onChange={(e) => {
          setSearchParams((prev) => {
            prev.set("category", e.target.value);
            prev.set("skip", 0);
            return prev;
          });
        }}
        value={category}
        className=" border-black border rounded-xl w-[11%] "
      >
        <option value="">Select Category</option>
        {categories?.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      </div>

      <section className="grid grid-cols-4 gap-2 font-mono ml-40">
        {products?.map((product) => (
          <article
            key={product.id}
            className="w-60 p-2 bg-white rounded-xl font-semibold hover:scale-105 hover:-translate-y-1 transition-transform duration-300 shadow-xl"
          >
            <img
              className="h-40 object-cover rounded-xl"
              src={product.images?.[0] || "https://via.placeholder.com/150"}
              alt={product.title}
            />
            <h1 className="font-bold text-lg">{product.title}</h1>
            <h2 className="font-semibold">Category: {product.category}</h2>
            <h2 className="font-semibold">Price: ${product.price}</h2>
            <h2 className="font-semibold">Quantity: {product.stock} pcs</h2>
            <Link
              to={`products/${product.id}`}
              state={product}
              className="inline-block p-0.5 font-semibold hover:underline hover:-translate-y-1 transition-transform duration-300"
            >
              Details
            </Link>
          </article>
        ))}
      </section>

      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={skip === 0}
          onClick={() => handleMove(-limit)}
          className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-100"
        >
          Prev
        </button>
        <button
          disabled={products.length < limit}
          onClick={() => handleMove(limit)}
          className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};
