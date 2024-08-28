import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const LandingPageModal = ({ open, onClose }, name, value, code) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={`${name}-modal-title`}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: 'rounded-lg bg-gray-100 p-6',
      }}
    >
      <DialogTitle
        id={`${name}-modal-title`}
        className="text-center text-5xl font-bold"
      >
        Welcome ${name} Clients!
      </DialogTitle>
      <DialogContent className="text-center mt-12 py-8">
        <img
          src={`./../../../public/img/${name}_logo.png`}
          alt="Bespoke Logo"
          className="w-4/5 max-w-s mx-auto mb-4"
        />
        <p className="text-base sm:text-lg leading-relaxed my-10">
          Welcome! We value your support and interest in using TouredIt. Use the discount code below to enjoy a
          <strong> <em>${value} discount</em></strong> on your next booking.
        </p>
        <p className="font-bold text-xl sm:text-3xl text-red-600 mt-10">
          {code}
        </p>
      </DialogContent>
      <DialogActions className="justify-center">
        <Button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LandingPageModal;
