import { toast } from 'sonner';

export function useToast() {
  return {
    success: toast.success,
    error: toast.error,
    loading: toast.loading,
    action: (message: string, label: string, onAction: () => void) => {
      toast(message, {
        action: { label, onClick: onAction },
      });
    },
    promise: toast.promise,
    dismiss:toast.dismiss,
    info:toast.info
  };
}
