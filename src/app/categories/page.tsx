import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface Categories {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
}

export default async function CategoriesPage() {
  const query = `*[_type == "category"]{
    _id,
    name,
    slug
  }`;

  const categories = await client.fetch(query);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Blog Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: Categories) => (
          <Link
            key={category._id}
            href={`/category/${category.slug.current}`}
            className="block p-4 border rounded-lg shadow-md hover:shadow-lg hover:text-white hover:bg-transparent bg-gray-50 transition-shadow duration-300 dark:bg-gray-500 dark:hover:bg-transparent"
          >
            <h2 className="text-lg font-semibold ">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
