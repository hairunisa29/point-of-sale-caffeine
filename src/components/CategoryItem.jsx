function CategoryItem({ category }) {
  return (
    <div className="rounded-lg p-2 bg-white shadow-sm shadow-indigo-100 hover:bg-primary hover:text-white cursor-pointer">
      {category}
    </div>
  );
}

export default CategoryItem;
