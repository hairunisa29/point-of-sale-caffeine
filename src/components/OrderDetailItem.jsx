import { formatCurrency } from "../utils/formatter";

function OrderDetailItem({ image, name, price, qty }) {
  return (
    <div className="grid grid-cols-4 gap-4 bg-white rounded-lg p-4">
      <div className="col-span-2 flex gap-4">
        <div className="rounded-lg w-20 h-20">
          <img
            src={image}
            alt={name}
            className="rounded-lg w-full h-full object-cover shadow-md"
          />
        </div>

        <div className="self-center">
          <h3 className="font-bold">{name}</h3>
          <span className="font-bold text-primary">
            {formatCurrency(price)}
          </span>
        </div>
      </div>

      <span className="self-center">{qty}</span>

      <span className="font-bold text-primary self-center">
        {formatCurrency(price * qty)}
      </span>
    </div>
  );
}

export default OrderDetailItem;
