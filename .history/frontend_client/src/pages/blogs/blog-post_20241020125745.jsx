import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types'; // Import block types for custom rendering

export function BlogPost() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize the Contentful client
  const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID, // Use environment variables for Contentful credentials
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await client.getEntry(id);
        console.log(response);
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

  // Custom render options for rich text
  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-4xl sm:text-5xl font-bold mb-6">{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-3xl sm:text-4xl font-bold mb-5">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-2xl sm:text-3xl font-bold mb-4">{children}</h3>,
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="text-lg sm:text-xl leading-relaxed mb-6">{children}</p>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc list-inside ml-6 mb-4">{children}</ul>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className="mb-2">{children}</li>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node.data.target.fields;
        const imageUrl = file.url.startsWith('//') ? `https:${file.url}` : file.url;
        return (
          <div className="my-6">
            <img src={imageUrl} alt={title} className="w-full h-auto mx-auto rounded shadow-md" />
            <p className="text-center text-sm text-gray-600 mt-2">{title}</p>
          </div>
        );
      },
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative isolate px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
      {/* Background element */}
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
      <div className="container mx-auto mt-32">
        {post ? (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6">{post.fields.title}</h1>
            <div className="text-gray-700">
              {/* Render the rich text content using documentToReactComponents with custom options */}
              {documentToReactComponents(post.fields.text, renderOptions)}
            </div>
          </div>
        ) : (
          <p>Post not found</p>
        )}
      </div>
    </div>
  );
}

export default BlogPost;
