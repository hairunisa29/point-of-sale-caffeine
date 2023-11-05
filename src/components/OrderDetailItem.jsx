import { formatCurrency } from "../utils/formatter";

function OrderDetailItem({ image, name, price, qty }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-2 flex gap-4">
        <div className="rounded-lg w-28 h-28">
          <img
            src={image}
            alt={name}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <span className="font-bold text-lg text-primary">{formatCurrency(price)}</span>
        </div>
      </div>

      {/* <div className="grid grid-cols-3 gap-4"> */}

      <span>{qty}</span>

      <span className="font-bold text-lg text-primary">{formatCurrency(price * qty)}</span>
      {/* </div> */}
    </div>
  );
}

export default OrderDetailItem;
