import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const BespokeModal = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="bespoke-modal-title"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: 'rounded-lg bg-gray-100 p-6',
      }}
    >
      <DialogTitle
        id="bespoke-modal-title"
        className="text-center text-2xl font-bold mb-2"
      >
        Welcome Bespoke Education Clients!
      </DialogTitle>
      <DialogContent className="text-center">
        <img
          src="@/../public/img/bespoke_logo.png"
          alt="Bespoke Logo"
          className="w-4/5 max-w-xs mx-auto mb-4"
        />
        <p className="text-base sm:text-lg leading-relaxed my-16">
          Welcome! We value your support and interest in using TouredIt. Use the discount code below to enjoy a
          $25 discount on your next booking.
        </p>
        <p className="font-bold text-xl sm:text-3xl text-red-600 mt-10">
          BESPOKECLIENT25
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

export default BespokeModal;
