import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';

export function Blog() {
  const [posts, setPosts] = useState([]);

  // Initialize the Contentful client
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID, // Replace with your space ID
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY, // Replace with your Content Delivery API access token
  });

  // Fetch blog posts from Contentful
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getEntries({
          content_type: import.meta.env.VITE_CONTENTFUL_CONTENT_ID, // Replace 'YOUR_CONTENT_TYPE_ID' with the correct ID
        });
        setPosts(response.items); // Save the posts to state
      } catch (error) {
        console.error('Error fetching posts from Contentful:', error);
      }
    };

    fetchPosts();
  }, []);

  const getPreviewText = (contentArray) => {
    const paragraph = contentArray.find((item) => item.nodeType === 'paragraph');
    return paragraph ? paragraph.content[0].value.substring(0, 150) + '...' : 'No preview available';
  };

  const getThumbnail = (pics) => {
    if (pics && pics.length > 0) {
      return pics[0].fields.file.url; // Assuming the image is in the 'file' field
    }
    return null;
  };

  return (
    <>
      <div className="relative isolate px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
        <div
          className="absolute inset-x-0  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0a49a8] to-[#4f8ff0] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="bg-white rounded-xl container mx-auto mt-32 py-2 px-2">
          <h1 className="text-center text-4xl font-bold mt-4 mb-8">Our Blog Posts</h1>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div key={post.sys.id} className="bg-white p-4 rounded-xl shadow-lg">
                  {getThumbnail(post.fields.pics) && (
                    <img
                      src={getThumbnail(post.fields.pics)}
                      alt={post.fields.title}
                      className="mb-4 h-48 w-full object-cover rounded"
                    />
                  )}
                  <h2 className="text-2xl font-bold mb-4">{post.fields.title}</h2>
                  <p className="text-gray-700">{getPreviewText(post.fields.text.content)}</p>
                  <a
                    href={`/post/${post.sys.id}`}
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    Read More
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">No posts found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;
