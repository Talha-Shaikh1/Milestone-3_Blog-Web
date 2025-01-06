import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';


interface Category {
  title: string;
}
interface Params {
  slug: string;
}
interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: string;
  content: [];
  author: { name: string; profession: string; image: string };
  categories: { title: string }[];
  publishedAt: string;
}


async function getAllBlogSlugs(): Promise<{ slug: string }[]> {
  try {
    const query = `*[_type == "blogPost"]{ slug }`;
    const slugs = await client.fetch<{ slug: { current: string } }[]>(query);

    if (!slugs || slugs.length === 0) {
      console.warn("No blog posts found in Sanity!");
      return [];
    }
    return slugs.map((slug) => ({ slug: slug.slug.current }));
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}

export async function generateStaticParams() {
  return await getAllBlogSlugs(); // Directly return the Promise
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = params;
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{ title }`;
  try {
    const post = await client.fetch<{ title: string }>(query, { slug });
    return {
      title: post?.title || `Blog Post: ${slug}`,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { title: `Blog Post: ${slug}` }; // Provide a default title to prevent build failure
  }
}

export default async function BlogPostPage(
  { params }: {params: Params}): Promise<JSX.Element> {
  const { slug } = params;
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    content,
    author->{
      name,
      profession,
      image
    },
    categories[]->{
      title
    },
    publishedAt
  }`;

  const post: BlogPost = await client.fetch(query, { slug });

  if (!post) {
    return <div className='text-center text-4xl font-bold'>Post not Found</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Blog content */}
      <div className="mb-4">
        {/* Main Image */}
        <Image
          src={urlFor(post.mainImage).width(1200).height(800).url()}
          alt={post.title}
          width={1200}
          height={800}
          className="w-full object-cover rounded-lg"
        />
        <div className="flex items-center mt-4">
          <Image
            src={urlFor(post.author.image).width(300).height(300).url()}
            alt={post.author.name}
            width={40}
            height={50}
            className="rounded-full"
          />
          <div className="ml-2">
            <p>{post.author.name}</p>
            <p className="text-sm text-teal-500">{post.author.profession}</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
        <p className="text-gray-500 mt-2">{new Date(post.publishedAt).toLocaleDateString()}</p>
        <div className="mt-4">
          {post.categories.map((category: Category) => (
            <span key={category.title} className="text-blue-500 text-sm mr-2">
              {category.title}
            </span>
          ))}
        </div>
      </div>

      {/* Blog Content */}
      <div className="mt-6">
        <PortableText
          value={post.content}
          components={{
            types: {
              image: ({ value }) => (
                <Image
                  src={urlFor(value.asset).url()}
                  alt={value.alt || 'Blog image'}
                  width={800}
                  height={500}
                  className="w-full object-cover my-4"
                />
              ),
            },
            block: {
              h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold my-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold my-4">{children}</h3>,
              normal: ({ children }) => <p className="my-4">{children}</p>,
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc ml-6 my-4 space-y-2">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal ml-6 my-4 space-y-2">{children}</ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li className="text-gray-800 text-base dark:text-gray-100 ">{children}</li>,
              number: ({ children }) => <li className="text-gray-800 text-base dark:text-gray-100">{children}</li>,
            },
            marks: {
              link: ({ children, value }) => (
                <a
                  href={value.href}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            },
          }}
        />
      </div>

      

    </div>
  );
}
