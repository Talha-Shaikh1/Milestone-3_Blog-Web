import { client } from '@/sanity/lib/client'
import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface Author {
    _id: string;
    name: string;
    image: string;
    profession: string;
    bio: string
  }

export default async function Authors() {

    const query = `*[_type == "author"]{
        _id,
          name,
          image,
          profession,
          bio  
      }`

      const authors = await client.fetch(query)


  return (
    <div className='max-w-4xl mx-auto'>
     {
        authors.map((author: Author) => (
            <div key={author._id}>
                <div className=' justify-start items-start '>
                <Image
                src={urlFor(author.image).url()}
                alt={author.name}
                width={1200}
                height={600}
                className='w-60 h-60 rounded-md' />
                </div>
                <div className=' text-center mb-20'>
                    <div className='flex justify-between mt-7 px-10'>
                    <h2 className='space-y-10 text-3xl font-bold'>
                        {author.name}
                    </h2>
                    <h4 className='text-xl text-[#0ef]'>
                        {author.profession}
                    </h4>
                    </div>
                    <p className='text-xl mt-10'>{author.bio}</p>
                </div>
            </div>
        ))
     }
    </div>
  )
}
