import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const NewPostPopup = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, content);
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Create a new post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full p-2 mb-2 text-lg font-semibold border-b border-gray-300 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post here..."
              className="w-full p-2 text-gray-700 border-b border-gray-300 focus:outline-none focus:border-purple-500 resize-none"
              rows="6"
              required
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white rounded-full bg-purple-600 hover:bg-purple-700"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChannelView = ({ channel, communityId }) => {
  const [posts, setPosts] = useState([]);
  const [isNewPostPopupOpen, setIsNewPostPopupOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [channel.id]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/get_channel_posts/${channel.id}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async (title, content) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/create_post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          channel_id: channel.id,
          author_id: 1, // TODO: Replace with actual logged-in user's ID
        }),
      });

      if (response.ok) {
        fetchPosts();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="font-[Poppins] min-h-screen bg-gray-100">
      <div className="px-[100px] pt-[20px] pb-[20px] h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{channel.name}</h2>
          <button
            onClick={() => setIsNewPostPopupOpen(true)}
            className="px-[30px] py-[15px] text-[20px] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ background: 'linear-gradient(99.78deg, #9181f4, #5038ed)' }}
          >
            New post
          </button>
        </div>
        <p className="mb-4 text-gray-600">{channel.description}</p>
  
        {isNewPostPopupOpen && (
          <NewPostPopup
            onClose={() => setIsNewPostPopupOpen(false)}
            onSubmit={handleCreatePost}
          />
        )}
  
        <div className="space-y-4">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white p-4 px-[40px] rounded-[20px] border border-gray-300 shadow-lg"
            >
              {/* <div className="text-[50px] font-semibold mb-2">{post.title}yttr</div> */}
              <p className="mb-2 text-[24px]">{post.content}</p>
              <p className="text-sm text-gray-500">
                Posted by {post.author} on {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
  
      </div>
    </div>
  );
  
};

export default ChannelView;