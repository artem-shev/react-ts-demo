import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface DialogProps {
  handleClose: (arg0: any) => any;
  title: string;
  children: JSX.Element | string;
  open: boolean;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: (arg0: any) => any;
}

const DialogBoilerplate = ({
  open,
  handleClose,
  title,
  children,
  description,
  cancelLabel,
  confirmLabel,
  onConfirm,
}: DialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{ height: 'inherit' }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" data-test="dialog_cancel_btn">
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          data-test="dialog_confirm_btn"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogBoilerplate.defaultProps = {
  description: undefined,
  open: true,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
};

export default DialogBoilerplate;
