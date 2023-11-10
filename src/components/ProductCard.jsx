import { formatCurrency } from "../utils/formatter";

function ProductCard({ img, name, price, stock, onClickProduct }) {
  return (
    <div
      className="block rounded-lg p-4 shadow-indigo-100 bg-white hover:shadow-md cursor-pointer"
      onClick={onClickProduct}
    >
      <img
        alt="Home"
        src={img}
        className="h-48 w-full rounded-md object-cover shadow-lg"
      />

      <div className="flex flex-col gap-2 mt-3">
        <h3 className="font-bold text-lg">{name}</h3>
        <div className="flex justify-between">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(price)}
          </span>
          <span className="text-sm self-center">Stock: {stock}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
