import { formatCurrency } from "../utils/formatter";

function CartItem({ image, name, price, qty }) {
  return (
    <div className="flex gap-4">
      <img src={image} className="rounded-lg w-20 h-20" />
      <div className="w-[197.72px]">
        <h3 className="font-bold">{name}</h3>
        <div className="flex justify-between mt-4">
          <span className="font-bold text-primary">
            {formatCurrency(price)}
          </span>
          <div className="flex justify-between gap-2">
            <button
              className={`${qty === 1 ? "bg-red-300" : "bg-primary"} h-full w-5 rounded text-white`}
              disabled={qty === 1}
            >
              -
            </button>
            <span className="text-gray-500">{qty}</span>
            <button className="bg-primary h-full w-5 rounded text-white">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
