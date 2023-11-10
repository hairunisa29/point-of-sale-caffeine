function CategoryItem({ category, selectedCategory, handleFilterCategory }) {
  return (
    <div
      className={`rounded-lg p-2 ${
        selectedCategory === category ? "bg-primary text-white" : "bg-white"
      }  font-bold text-sm shadow-sm shadow-indigo-100 hover:bg-primary hover:text-white cursor-pointer`}
      onClick={handleFilterCategory}
    >
      {category}
    </div>
  );
}

export default CategoryItem;
