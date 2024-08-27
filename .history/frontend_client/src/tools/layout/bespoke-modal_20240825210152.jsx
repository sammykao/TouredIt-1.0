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
      PaperProps={{
        sx: {
          borderRadius: '0.75rem', // rounded-lg equivalent
          backgroundColor: '#f3f4f6', // bg-gray-100 equivalent
          padding: '1.5rem', // p-6 equivalent
        },
      }}
    >
      <DialogTitle
        id="bespoke-modal-title"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem', // text-2xl equivalent
          marginBottom: '0.5rem', // mb-2 equivalent
        }}
      >
        Welcome Bespoke Education Clients!
      </DialogTitle>
      <DialogContent
        sx={{
          textAlign: 'center',
        }}
      >
        <img
          src="@/../public/img/bespoke_logo.png"
          alt="Bespoke Logo"
          style={{
            width: '80%',
            maxWidth: '16rem', // max-w-xs equivalent
            margin: '1rem auto', // mx-auto mb-4 equivalent
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontSize: '1rem', // text-base equivalent
            lineHeight: '1.75', // leading-relaxed equivalent
            marginY: '4rem', // my-16 equivalent
          }}
        >
          Welcome! We value your support and interest in using TouredIt. Use the discount code below to enjoy a
          $25 discount on your next booking.
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.25rem', // text-xl equivalent
            color: '#dc2626', // text-red-600 equivalent
            marginTop: '2.5rem', // mt-10 equivalent
          }}
        >
          BESPOKECLIENT25
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: '#3b82f6', // bg-blue-500 equivalent
            '&:hover': {
              backgroundColor: '#2563eb', // hover:bg-blue-600 equivalent
            },
            color: 'white',
            paddingX: '1.5rem', // px-6 equivalent
            paddingY: '0.5rem', // py-2 equivalent
            borderRadius: '0.5rem', // rounded-lg equivalent
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BespokeModal;
