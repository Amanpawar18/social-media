import { useEffect, useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("/api/jokes")
  //     .then((response) => {
  //       console.log(response.data.jokesData);
  //       setJokes(response.data.jokesData);
  //     })
  //     .catch((error) => {
  //       console.error("Error: " + error);
  //     });
  // });

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
                alt="Instagram Logo"
                className="h-8"
              />
              <input
                type="text"
                placeholder="Search"
                className="hidden sm:block px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800">
                Home
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                Messages
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                Notifications
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                Profile
              </button>
            </div>
          </div>
        </header>

        {/* Main Content (Flexbox Layout) */}
        <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Left Sidebar (only for large screens) */}
          <div className="hidden lg:block col-span-1 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Suggestions</h3>
            {/* Suggested Users */}
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="rounded-full h-10 w-10"
                />
                <span className="font-semibold text-sm">User1</span>
              </li>
              <li className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="rounded-full h-10 w-10"
                />
                <span className="font-semibold text-sm">User2</span>
              </li>
            </ul>
          </div>

          {/* Main Feed */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6">
            {/* Post 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="rounded-full h-10 w-10"
                />
                <div className="flex-1">
                  <span className="font-semibold">User1</span>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
                <button className="text-gray-600">...</button>
              </div>
              <img
                src="https://via.placeholder.com/600x400"
                alt="Post Image"
                className="my-4 w-full rounded-lg"
              />
              <div className="flex items-center space-x-4">
                <button className="text-gray-600">Like</button>
                <button className="text-gray-600">Comment</button>
                <button className="text-gray-600">Share</button>
              </div>
            </div>
            {/* Repeat similar posts here */}
          </div>

          {/* Right Sidebar (only for large screens) */}
          <div className="hidden lg:block col-span-1 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">Stories</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Story"
                  className="rounded-full h-12 w-12"
                />
                <span className="font-semibold text-sm">User1</span>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Story"
                  className="rounded-full h-12 w-12"
                />
                <span className="font-semibold text-sm">User2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white p-4 shadow-md mt-8">
          <div className="max-w-7xl mx-auto flex justify-between">
            <span className="text-sm text-gray-600">
              © 2024 Instagram Clone
            </span>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-800">
                About
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                Help
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                Terms
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;

// <div className="flex flex-col h-screen bg-gray-100">
//   {/* Header */}
//   <header className="bg-red-600 p-4 text-white flex items-center justify-between shadow-md">
//     <div className="flex items-center space-x-4">
//       <img
//         src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
//         alt="YouTube logo"
//         className="h-8"
//       />
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-96 px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
//       />
//     </div>
//     <div className="flex items-center space-x-4">
//       <button className="text-white">Sign in</button>
//       <button className="bg-gray-800 text-white px-4 py-2 rounded-full">
//         Create
//       </button>
//     </div>
//   </header>

//   {/* Main Content */}
//   <div className="flex flex-1 overflow-hidden">
//     {/* Sidebar */}
//     <div className="w-60 bg-white border-r border-gray-300 p-4 space-y-4">
//       <div className="space-y-2">
//         <h2 className="text-gray-600 font-semibold">Explore</h2>
//         <ul>
//           <li className="text-gray-800 hover:text-red-600 cursor-pointer">
//             Home
//           </li>
//           <li className="text-gray-800 hover:text-red-600 cursor-pointer">
//             Trending
//           </li>
//           <li className="text-gray-800 hover:text-red-600 cursor-pointer">
//             Subscriptions
//           </li>
//           <li className="text-gray-800 hover:text-red-600 cursor-pointer">
//             Library
//           </li>
//         </ul>
//       </div>
//       <div className="space-y-2">
//         <h2 className="text-gray-600 font-semibold">Subscriptions</h2>
//         <ul>
//           <li className="text-gray-800 hover:text-red-600 cursor-pointer">
//             Channel 1
//           </li>
//           <li className="text-gray-800 hover:text-red-600 cursor-pointer">
//             Channel 2
//           </li>
//           <li className="text-gray-800 hover:text-red-600 cursor-pointer">
//             Channel 3
//           </li>
//         </ul>
//       </div>
//     </div>

//     {/* Video Grid */}
//     <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto">
//       {/* Example Video Card */}
//       <div className="bg-white rounded-md shadow-md overflow-hidden">
//         <img
//           src="https://via.placeholder.com/320x180.png?text=Video+Thumbnail"
//           alt="Video Thumbnail"
//           className="w-full h-48 object-cover"
//         />
//         <div className="p-4">
//           <h3 className="text-lg font-semibold text-gray-800">
//             Video Title
//           </h3>
//           <p className="text-gray-600 text-sm">Channel Name</p>
//           <p className="text-gray-500 text-xs">1M views • 1 day ago</p>
//         </div>
//       </div>

//       {/* Repeat the video card structure for more video thumbnails */}
//       <div className="bg-white rounded-md shadow-md overflow-hidden">
//         <img
//           src="https://via.placeholder.com/320x180.png?text=Video+Thumbnail"
//           alt="Video Thumbnail"
//           className="w-full h-48 object-cover"
//         />
//         <div className="p-4">
//           <h3 className="text-lg font-semibold text-gray-800">
//             Video Title
//           </h3>
//           <p className="text-gray-600 text-sm">Channel Name</p>
//           <p className="text-gray-500 text-xs">500K views • 3 days ago</p>
//         </div>
//       </div>

//       {/* Add more video cards as needed */}
//     </div>
//   </div>

//   {/* Footer */}
//   <footer className="bg-gray-800 text-white py-4 mt-auto">
//     <div className="max-w-screen-xl mx-auto px-4 flex justify-between">
//       <div className="space-x-4">
//         <a href="#" className="hover:text-gray-400">
//           About
//         </a>
//         <a href="#" className="hover:text-gray-400">
//           Press
//         </a>
//         <a href="#" className="hover:text-gray-400">
//           Contact us
//         </a>
//       </div>
//       <div className="space-x-4">
//         <a href="#" className="hover:text-gray-400">
//           Privacy
//         </a>
//         <a href="#" className="hover:text-gray-400">
//           Terms
//         </a>
//         <a href="#" className="hover:text-gray-400">
//           Ads
//         </a>
//       </div>
//     </div>
//   </footer>
// </div>
