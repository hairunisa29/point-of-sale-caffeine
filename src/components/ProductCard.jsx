import { formatCurrency } from "../utils/formatter";

function ProductCard({ img, name, price, qty }) {
  return (
    <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100 bg-white">
      <img
        alt="Home"
        src={img}
        className="h-56 w-full rounded-md object-cover"
      />

      <div className="flex flex-col gap-2 mt-3">
        <h3 className="font-bold">{name}</h3>
        <div className="flex justify-between">
          <span className="text-md font-bold text-primary">
            {formatCurrency(price)}
          </span>
          <span className="text-sm">Stock: {qty}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
