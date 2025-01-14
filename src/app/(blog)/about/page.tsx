import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface Author {
  _id: string;
  name: string;
  image: string;
  profession: string
}

export default async function page(){

  console.log('Sanity Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);


  const query = `*[_type == "author"]{
  _id,
    name,
    image,
    profession
}`

  const authors = await client.fetch(query)


  return (
    <div className="p-6 md:p-10 lg:p-20 ">
      <div className="max-w-6xl mx-auto rounded-lg shadow-lg overflow-hidden">
        
        <div className="relative">
          <Image
            src="/about.png" 
            alt="About Us"
            width={1200}
            height={800}
            className="w-full h-[500px] object-cover "
          />
          
        </div>
       
        <div className="p-6 md:p-10">
          
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 dark:text-[#0ef]">
              Welcome to Our Blog
            </h2>
            <p className="text-gray-600 leading-relaxed md:leading-loose md:text-lg dark:text-gray-300">
              At <strong className="dark:text-[#0ef]">Our Blog</strong>, we are passionate about sharing insightful articles, 
              tips, and stories across a variety of topics. Our mission is to inspire, educate, 
              and connect with our readers through engaging content and thoughtful discussions.
            </p>
          </div>

          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-[#0ef]">Our Story</h3>
              <p className="text-gray-600 leading-relaxed dark:text-gray-300">
                Founded in [2025], our blog started as a small passion project to document 
                our journey and share our insights. Over the years, it has grown into a 
                vibrant community of readers who value quality content and meaningful interactions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-[#0ef]">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed dark:text-gray-300">
                Our mission is to provide a platform for voices that matter, ideas that spark 
                curiosity, and stories that inspire change. We believe in the power of words to 
                make a difference and aim to create a space where ideas flourish.
              </p>
            </div>
          </div>

          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 dark:text-[#0ef]">Meet the Team</h3>
            <div className="flex flex-wrap justify-center gap-10">
             
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 text-center">
                {authors.map((author: Author) => (
                  <Link href={"/authors/"} key={author._id}>
                  <div >
                    <Image
                    src={urlFor(author.image).url()}
                    alt={author.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-3" />

                    <h4 className="font-bold text-xl">{author.name}</h4>
                    <p className="text-gray-500 dark:text-[#0ef]">{author.profession}</p>
                  </div>
                  </Link>
                  
                ))}
              </div>
            </div>
          </div>

          {/* Closing Section */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-[#0ef]">
              Join Us on Our Journey
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 dark:text-gray-300">
              We are excited to have you here and can&apos;t wait to share more stories, tips, 
              and insights with you. Thank you for being part of our journey. Let&apos;s create, 
              learn&#44; and grow together&#33;
            </p>
            <Link href="/contact">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


