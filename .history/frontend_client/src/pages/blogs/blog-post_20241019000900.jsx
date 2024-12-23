import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the ID from the URL
import { createClient } from 'contentful';

export function BlogPost() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize the Contentful client
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID, // Use environment variables for Contentful credentials
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch the post by ID
  useEffect(() => {
    console.log("HIII");
    const fetchPost = async () => {
      try {
        const response = await client.getEntry(id); // Fetch the post using the ID
        setPost(response); // Set the post data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post from Contentful:', err);
        setError('Could not fetch the post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="relative isolate px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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

        {/* Render the post content */}
        <div className="container mx-auto">
          {post ? (
            <div className="bg-white p-6 rounded shadow-lg">
              <h1 className="text-4xl font-bold mb-4">{post.fields.title}</h1>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.fields.body }} // Assuming 'body' is rich text
              />
            </div>
          ) : (
            <p>Post not found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogPost;
