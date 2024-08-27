import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const BespokeModal = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="bespoke-modal-title"
      maxWidth="sm"
      fullWidth
      classes={{ paper: 'rounded-lg bg-gray-100 p-6' }}
    >
      <DialogTitle
        id="bespoke-modal-title"
        className="text-center text-2xl font-bold mb-2"
      >
        Special Offer for Bespoke Clients
      </DialogTitle>
      <DialogContent className="text-center">
        <img
          src="@/../public/img/bespoke_logo.png"
          alt="Bespoke Logo"
          className="w-4/5 max-w-xs mx-auto mb-4"
        />
        <Typography
          variant="body1"
          className="text-base sm:text-lg leading-relaxed mb-4"
        >
          Welcome, Bespoke client! We appreciate your interest in using TouredIt. Use the discount code below to enjoy a
          $25 discount on your next booking.
        </Typography>
        <Typography
          variant="h5"
          className="font-bold text-xl sm:text-2xl text-red-600 mt-4"
        >
          BESPOKECLIENT25
        </Typography>
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
