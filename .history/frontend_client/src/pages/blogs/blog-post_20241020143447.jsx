import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types'; // Import block types for custom rendering
import Newsletter from "./../newsletter/newsletter";


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
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-3xl sm:text-5xl font-bold mb-6">{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-2xl sm:text-4xl font-bold mb-5">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-xl sm:text-3xl font-bold mb-4">{children}</h3>,
      [BLOCKS.PARAGRAPH]: (node, children) => <div><p className="text-md sm:text-lg leading-relaxed">{children}</p><br/></div>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc ml-6">{children}</ul>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className="">{children}</li>,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title, description } = node.data.target.fields;
        const imageUrl = file.url.startsWith('//') ? `https:${file.url}` : file.url;
        const { width, height } = file.details.image;

        return (
            <div className="my-6">
              <img
                src={imageUrl}
                alt={title}
                width={width}
                height={height}
                className="w-full sm:w-auto h-auto mx-auto rounded shadow-md"
                style={{ maxWidth: '100%', height: 'auto', maxHeight: height }}
              />
              <p className="text-center text-sm text-gray-600 mt-2">{title}</p>
            </div>
        );
      },
    },
  };

  if (loading) { 
    return (
        <div className="relative isolate px-4 sm:px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="flex mt-32 items-center justify-center px-6 pt-14">
                <div
                className="justify-center inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
                >
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >
                    Loading...
                </span>
                </div>
            </div>
        </div>
    ); 
  }
  if (error) return <p>{error}</p>;

  return (
    <div className="relative isolate px-4 sm:px-6 pb-20 pt-14 lg:px-8 min-h-screen bg-gray-500">
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
      <div className="container mx-auto mt-16 sm:mt-32">
        {post ? (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4">{post.fields.title}</h1>
            <p className="text-sm sm:text-md font-semibold mb-2 sm:mb-4">
                {post.sys.createdAt ? `${new Date(post.sys.createdAt).toLocaleDateString()}` : 'No date available'}
            </p>
            <div className="text-gray-700">
              {/* Render the rich text content using documentToReactComponents with custom options */}
              {documentToReactComponents(post.fields.text, renderOptions)}
            </div>
          </div>
        ) : (
          <p>Post not found</p>
        )}
        <Newsletter />
      </div>
    </div>
  );
}

export default BlogPost;
