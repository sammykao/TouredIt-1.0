import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export function BespokeModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="bespoke-modal-title">
      <DialogTitle id="bespoke-modal-title">Special Offer for Bespoke Clients</DialogTitle>
      <DialogContent>
        <img src="/path/to/bespoke-logo.png" alt="Bespoke Logo" style={{ width: '100%', marginBottom: '16px' }} />
        <Typography variant="body1" gutterBottom>
          Welcome, Bespoke client! We have a special offer just for you. Use the discount code below to enjoy a 20% discount on your next booking.
        </Typography>
        <Typography variant="h5" style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '16px' }}>
          BESPOKE20
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BespokeModal;
