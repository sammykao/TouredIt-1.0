import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import ReactDOM from 'react-dom'; // Import for creating portal


const Sidebar = ({ show, onClose, bookingData, setBookingData, handleBookingSubmit, guideInfo }) => {
    const sidebarRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          onClose(); // Close the sidebar if clicked outside
        }
      };
  
      // Attach event listener
      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup event listener on unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);
  
    const togglePackage = (packageName) => {
      setBookingData((prevData) => ({
        ...prevData,
        [packageName]: !prevData[packageName],
      }));
    };
  
    return ReactDOM.createPortal(
      <div
        className={`fixed inset-0 w-full h-full bg-black bg-opacity-75 z-[10000] transition-opacity duration-300 ease-in-out ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 10000 }} // Overlay with high z-index
      >
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 right-0 w-full md:w-96 h-full bg-white shadow-lg transform ${
            show ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-[10001] overflow-y-auto`}
          style={{ zIndex: 10001 }} // Sidebar with higher z-index
        >
          <div className="px-4 pt-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl font-bold">Request a Tour</h2>
            <button
              onClick={onClose}
              className="text-gray-600 rounded-lg text-4xl hover:text-gray-900 focus:outline-none"
            >
              &times;
            </button>
          </div>
          <Typography className='px-4 font-bold text-gray-800'>$150</Typography>
          <div className="p-4">
            {(guideInfo?.greek_life || guideInfo?.student_athlete || guideInfo?.paid_internship) && (
              <>
                <Typography className='text-xl font-bold text-black mb-4'>Add packages to your request</Typography>
                <div className="mb-4 space-y-4">
                  {guideInfo?.greek_life && (
                    <div
                      className={`border p-4 rounded-lg cursor-pointer ${
                        bookingData.greek_life ? 'bg-blue-500 shadow border-blue-500' : 'bg-white border-gray-800'
                      }`}
                      onClick={() => togglePackage('greek_life')}
                    >
                      <div className="flex items-center">
                        <SportsBarIcon className={`${bookingData.greek_life ? 'text-white' : 'text-[#ca8a04]'}`} />
                        <div className="ml-4">
                          <h2 className={`font-bold ${bookingData.greek_life ? 'text-white' : 'text-gray-900'}`}>Greek Life Experience</h2>
                          <p className={`text-sm my-2 ${bookingData.greek_life ? 'text-gray-200' : 'text-gray-900'}`}> Spend an additional 30 minutes exploring Greek life on campus, 
                            learning about the rush process, and touring the guide's fraternity or sorority house(s)</p>
                          <p className={`text-sm font-bold ${bookingData.greek_life ? 'text-white' : 'text-gray-700'}`}>+$50</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {guideInfo?.student_athlete && (
                    <div
                      className={`border p-4 rounded-lg cursor-pointer ${
                        bookingData.student_athlete ? 'bg-blue-500 shadow border-blue-500' : 'bg-white border-gray-800'
                      }`}
                      onClick={() => togglePackage('student_athlete')}
                    >
                      <div className="flex items-center">
                        <EmojiEventsIcon className={`${bookingData.student_athlete ? 'text-white' : 'text-[#eab308]'}`} />
                        <div className="ml-4">
                          <h2 className={`font-bold ${bookingData.student_athlete ? 'text-white' : 'text-gray-900'}`}>Student Athlete Life</h2>
                          <p className={`text-sm my-2 ${bookingData.student_athlete ? 'text-gray-200' : 'text-gray-900'}`}>Spend an additional 30 minutes learning about the recruiting process, 
                          how to balance academics and athletics, and touring the athletic facilities.
                          </p>
                          <p className={`text-sm font-bold ${bookingData.student_athlete ? 'text-white' : 'text-gray-700'}`}>+$50</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {guideInfo?.paid_internship && (
                    <>
                    <div
                      className={`border p-4 rounded-lg cursor-pointer ${
                        bookingData.paid_internship ? 'bg-blue-500 shadow border-blue-500' : 'bg-white border-gray-800'
                      }`}
                      onClick={() => togglePackage('paid_internship')}
                    >
                      <div className="flex items-center">
                        <WorkIcon className={`${bookingData.paid_internship ? 'text-white' : 'text-[#4d7c0f]'}`} />
                        <div className="ml-4">
                          <h2 className={`font-bold ${bookingData.paid_internship ? 'text-white' : 'text-gray-900'}`}>Internship Insights</h2>
                          <p className={`text-sm my-2 ${bookingData.paid_internship ? 'text-gray-200' : 'text-gray-900'}`}>Spend an extra 30 minutes to learn about the internship recruitment process, how to get internships as a college student, 
                            and resume/LinkedIn review.</p>
                          <p className={`text-sm font-bold ${bookingData.paid_internship ? 'text-white' : 'text-gray-700'}`}>+$40</p>
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                </div>
              </>
            )}
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Comments</label>
                <textarea
                  value={bookingData.comments}
                  onChange={(e) => setBookingData({ ...bookingData, comments: e.target.value })}
                  className="w-full p-2 h-32 border border-gray-300 rounded focus:outline-none"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>,
      document.body // Mount the sidebar at the body level
    );
};
  
export default Sidebar;