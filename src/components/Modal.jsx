import { IoCloseOutline } from "react-icons/io5";

function Modal({
  title,
  handleSubmit,
  register,
  onSubmitModal,
  errors,
  handleClose,
}) {
  return (
    <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="h-fit w-fit p-4 rounded-lg bg-white shadow-md">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <IoCloseOutline
            className="text-lg cursor-pointer"
            onClick={handleClose}
          />
        </div>

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
              className="w-full rounded-md border-[1px] border-gray-200 py-3 px-2 shadow-sm sm:text-sm"
              {...register("category")}
            >
              <option value="" disabled>
                Select Category
              </option>
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

          <div className="flex gap-4">
            <button
              className="w-full p-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white text-sm font-bold"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              className="w-full p-2 rounded-lg bg-primary hover:bg-blue-800 text-white text-sm font-bold"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
