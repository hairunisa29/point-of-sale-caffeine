function CategoryItem({ category }) {
  return (
    <div className="rounded-lg p-2 border-primary border-2 hover:bg-primary hover:text-white cursor-pointer">
      {category}
    </div>
  );
}

export default CategoryItem;
