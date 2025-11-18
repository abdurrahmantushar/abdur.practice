import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams({ skip: 0, limit: 10 });

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

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search"
        onChange={debounce((event) => {
          setSearchParams((prev) => {
            prev.set("q", event.target.value);
            prev.set("skip", 0);
            prev.delete('category');
            return prev;
          });
        }, 1000)}
        className="mb-4 p-2 border rounded w-full"
      />
      <select
        onChange={(e) => {
          setSearchParams((prev) => {
            prev.set("category", e.target.value);
            prev.set("skip", 0);
            return prev;
          });
        }}
        value={category}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="">Select Category</option>
        {categories?.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <section className="grid grid-cols-4 gap-2">
        {products?.map((product) => (
          <article
            key={product.id}
            className="w-60 p-2 bg-white rounded-xl font-semibold hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
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
