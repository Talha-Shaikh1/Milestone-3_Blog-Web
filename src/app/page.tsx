import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string
  },
  mainImage: string;
  excerpt: string;
  categories: {
    name: string;
    logo: string
  },
  author: {
    name: string;
    profession: string;
    image: string
  }
}

export const revalidate = 60;

const BlogPage = async () => {
  const query = `*[_type == "blogPost"]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    categories[0]->{
      name,
      logo
    },
    author->{
      name,
      profession,
      image
    }
  }`;

  const posts = await client.fetch(query);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.map((post: Post) => (
        <Link href={`/blog/${post.slug.current}`} key={post._id}>
          <div className="border rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 h-[400px]">
            {/* Blog Image */}
            <div className="relative group">
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-56 object-cover transition-transform duration-300 brightness-90 group-hover:scale-105 group-hover:brightness-105"
                />
              ) : (
                <div className="bg-gray-200 w-full h-40 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              {post.categories?.logo || post.categories?.name ? (
                <div className="absolute top-2 left-2 bg-white bg-opacity-75 rounded-full px-2 py-1 flex items-center shadow">
                  {post.categories.logo ? (
                    <Image
                      src={urlFor(post.categories.logo).width(24).height(24).url()}
                      alt={post.categories.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : null}
                  <span className="ml-2 text-sm font-medium text-gray-800">
                    {post.categories?.name}
                  </span>
                </div>
              ) : null}
            </div>
            {/* Blog Details */}
            <div className="p-4 flex-1">
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3 dark:text-gray-200 dark:text-opacity-55">
                {post.excerpt.substring(0, 60) || 'No description available.'}
              </p>
              <div className="flex items-center mt-4">
                {post.author?.image ? (
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-gray-300 rounded-full w-8 h-8"></div>
                )}
                <div className="ml-2">
                  <p className="text-sm font-medium">{post.author?.name || 'Unknown Author'}</p>
                  <p className="text-xs dark:text-[#0ef] text-gray-400">
                    {post.author?.profession || 'Unknown Profession'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogPage;
