import { toast } from 'react-toastify';

export const notifyInfo = (message: string) => {
  toast.info(message, {
    position: 'bottom-center',
  });
};

export const notifyError = (message: string) => {
  toast.info(message, {
    position: 'bottom-center',
  });
};
