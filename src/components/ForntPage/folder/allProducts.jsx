import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { CgSmileSad } from "react-icons/cg";

import debounce from "lodash.debounce";
import { useContext } from "react";
import { DataContext } from "../../../CustomComponents/contextApi";
import { ShoppingCard } from "./Shopping";
import { useDispatch, useSelector } from "react-redux";
import { AddItem } from "../../../app.store/slice/cardslice";


export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams({ skip: 0, limit: 8 });
  const skip = parseInt(searchParams.get("skip") || 0);
  const limit = parseInt(searchParams.get("limit") || 5);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const { showCard, setShowCard } = useContext(DataContext);
  const dispatch = useDispatch();
  const items = useSelector(state => state.cardR)

  const subtotal = items.reduce((total, item) => total + item.quantity * item.product.price, 0)
  const deliveryFee = 0.20
  const taxes = (subtotal * 2 / 100)
  const total = Math.floor(subtotal + deliveryFee + taxes)



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

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
    </div>
  );;

  return (
    <div className="p-4 ">
      <div className=" flex gap-[600px] ml-20 mb-10 ">
        <div className=" border outline-none w-[14%] h-[30px] gap-1.5 rounded-xl mb-3 flex items-center">

          <IoMdSearch className=" ml-2" />
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
          className=" border-black border rounded-xl w-[11%] h-15 "
        >
          <option value="">Select Category</option>
          {categories?.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <div className=" w-20 h-20 shadow-lg flex justify-center items-center rounded-2xl cursor-pointer ">

          <MdShoppingCartCheckout
            onClick={() => {
              setShowCard(true)
            }}
            className=" w-9 h-9  " />
          <span className=" absolute  ml-9 mb-7 font-mono font-semibold w-2 text-xl">{items.length}</span>
        </div>
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
              className="inline-block p-0.5 font-semibold hover:underline hover:-translate-y-1 transition-transform duration-300 mt-4"
            >
              Details
            </Link>
            <button
              onClick={() => { dispatch(AddItem({ product })) }}
              className=" ml-7 hover:underline cursor-pointer text-x hover:-translate-y-1 transition-transform duration-300"> Add To Chart </button>

          </article>

        ))}
      </section>
      <div className={`w-[25vw] h-[70%] fixed top-20 right-0 bg-gray-100 shadow-lg transition-all duration-500 ${showCard ? "translate-x-0" : "translate-full"} flex flex-col`} >
        <header className=" flex justify-between items-center p-" >
          <p className=" text-xl font-mono font-semibold mt-3 ml-2"> Shopping </p>
          <FaArrowRightToBracket
            onClick={() => {
              setShowCard(false)
            }}
            className=" w-6 h-6 cursor-pointer mr-2 hover:bg-gray-300 " />
        </header>
        { items.length>0?        <>
        <div className="flex-1 overflow-auto overflow-y-auto  w-full mt-8 flex flex-col gap-2">
          {items.map((item) => (
            <ShoppingCard
              product={item.product}
              key={item.product.id}
              name={item.product.title}
              price={item.product.price}
              image={item.product.images?.[0]}
              quantity={item.quantity || 1}
            />
          ))}
          <div className=" w-full border-t-2 border-b-2   border-gray-400  ">
            <div className=" font-mono font-semibold text-x justify-between items-center flex mr-5 ml-5 mt-2">
              <span>Subtotal</span>
              ${subtotal.toFixed(2)}/-
            </div>
            <div className=" font-mono font-semibold text-x justify-between items-center flex mr-5 ml-5 mt-2">
              <span>Delivery Fee </span>
              ${deliveryFee}/-
            </div>
            <div className=" font-mono font-semibold text-x justify-between items-center flex mr-5 ml-5 mt-2">
              <span>Taxes</span>
              ${taxes.toFixed(2)}/-
            </div>
          </div>
          <div className=" font-mono font-semibold text-xl justify-between items-center  flex mr-5 ml-5 ">
            <span className=" ">Total</span>
            ${total.toFixed(2)}/-
          </div>
          <div className=" flex justify-center items-center mt-5">
            <button className=" w-[40%] p-1 rounded-lg bg-slate-400 cursor-pointer font-mono hover:bg-slate-600 hover:text-white" >
              Buy Now </button>
          </div>
        </div>
        </>: <p className=" font-mono p-30 mt-20 text-2xl font-semibold flex  "> 
          <CgSmileSad className=" mt-0 mr-1 w-8 h-8"/>
          NO ORDER YET </p> }

      </div>

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
