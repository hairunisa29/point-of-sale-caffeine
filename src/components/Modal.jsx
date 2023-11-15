import { Card, CardBody, Dialog } from "@material-tailwind/react";

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
          <h1 className="mb-4 text-2xl font-bold">{title}</h1>

          <form
            className="flex flex-col gap-4 text-sm"
            onSubmit={handleSubmit(onSubmitModal)}
          >
            <div>
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                placeholder="Product Name"
                className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
                {...register("productName")}
              />
              <p className="error">{errors.productName?.message}</p>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                placeholder="Category"
                className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
                {...register("category")}
              >
                <option value="Coffee">Coffee</option>
                <option value="Non Coffee">Non Coffee</option>
                <option value="Pastry">Pastry</option>
              </select>
              <p className="error">{errors.category?.message}</p>
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                placeholder="Price"
                className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
                {...register("price")}
              />
              <p className="error">{errors.price?.message}</p>
            </div>

            <div>
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                placeholder="Stock"
                className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
                {...register("stock")}
              />
              <p className="error">{errors.stock?.message}</p>
            </div>

            <div>
              <label htmlFor="image">Upload Image</label>
              <input
                id="image"
                type="file"
                className="w-full rounded-md border-[1px] border-gray-200 p-3 shadow-sm sm:text-sm"
                {...register("image")}
              />
              <p className="error">{errors.image?.message}</p>
            </div>

            <button
              className={`w-full p-2 rounded-lg bg-primary hover:bg-blue-700 text-white text-sm font-bold`}
              // onClick={handleFinishPayment}
            >
              Submit
            </button>
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