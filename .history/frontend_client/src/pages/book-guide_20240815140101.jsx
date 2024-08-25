import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { isAuthenticated } from "./../tools/auth/loggedIn";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';


const Sidebar = ({ show, onClose, bookingData, setBookingData, handleBookingSubmit }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-lg transform ${
        show ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-bold">Request a Tour</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          &times;
        </button>
      </div>
      <div className="p-4">
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
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
