import { useDispatch } from "react-redux";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CutItem, Decrement, Increment} from "../../../app.store/slice/cardslice";

export const ShoppingCard = ({ name, price, image, quantity, product }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full h-[140px] bg-gray-200 shadow-xl flex">
      <div className="w-[60%] h-full flex">
        <div className="w-[60%] h-full overflow-hidden">
          <img src={image} alt="image" className="rounded-lg h-[130px] mt-4 mr-[30]" />
        </div>
        <div className="w-[40%] h-full">
          <div className="text-xs font-mono font-semibold mt-5">{name}</div>
          <div className="text-2xl mt-2 w-[110px] h-[50px] flex justify-center items-center gap-2 shadow-2xl">
            <button
            onClick={()=>dispatch(Decrement(product.id))}
              className="w-[40%] bg-white h-10 rounded border-1 hover:bg-slate-200"
            >
              -
            </button>
            <span className="w-[45%] h-10 flex justify-center items-center rounded bg-slate-400">
              {quantity}
            </span>
            <button
            onClick={() => dispatch(Increment(product.id))}
              className="w-[40%] bg-white h-10 rounded border-1 hover:bg-slate-200"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="ml-25 text-xl font-mono font-semibold">
        {price}$
        <MdOutlineDeleteSweep
          onClick={() => dispatch(CutItem(product.id))}          
          className="m-10 w-7 h-7 ml-5 cursor-pointer"
        />
        
      </div>
    </div>
  );
};
