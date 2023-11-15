import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Dialog,
} from "@material-tailwind/react";

function Modal({
  title,
  handleSubmit,
  register,
  onSubmitModal,
  errors,
  open,
  handleShow,
}) {
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleShow}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody>
          <h1>{title}</h1>

          <form onSubmit={handleSubmit(onSubmitModal)}>
            <div>
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                name="productName"
                placeholder="Product Name"
                className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
                {...register("productName")}
              />
              <p className="error">{errors.name?.message}</p>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                placeholder="Category"
                className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
                {...register("category")}
              >
                <option></option>
                <option></option>
                <option></option>
              </select>
              <p className="error">{errors.name?.message}</p>
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                placeholder="Price"
                className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
                {...register("price")}
              />
              <p className="error">{errors.name?.message}</p>
            </div>

            <div>
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                name="stock"
                placeholder="Stock"
                className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
                {...register("stock")}
              />
              <p className="error">{errors.name?.message}</p>
            </div>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
}

{
  /* <div className="fixed justify-center items-center inset-0 z-1 h-fit w-fit p-4 rounded-lg bg-white shadow-md" role="dialog">
      <h1>{title}</h1>

      <form onSubmit={handleSubmit(onSubmitModal)}>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            name="productName"
            placeholder="Product Name"
            className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
            {...register("productName")}
          />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            placeholder="Category"
            className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
            {...register("category")}
          >
            <option></option>
            <option></option>
            <option></option>
          </select>
          <p className="error">{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            placeholder="Price"
            className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
            {...register("price")}
          />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            placeholder="Stock"
            className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
            {...register("stock")}
          />
          <p className="error">{errors.name?.message}</p>
        </div>
      </form>
    </div> */
}

export default Modal;
