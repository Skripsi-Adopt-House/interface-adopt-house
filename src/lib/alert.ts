import Swal, { SweetAlertOptions } from 'sweetalert2';

/**
 * Alert Service - Centralized SweetAlert2 notifications
 */

class AlertService {
  static success(title: string, message?: string, options?: SweetAlertOptions) {
    return Swal.fire({
      icon: 'success',
      title,
      text: message,
      confirmButtonColor: '#6499E9',
      ...options,
    });
  }

  static error(title: string, message?: string, options?: SweetAlertOptions) {
    return Swal.fire({
      icon: 'error',
      title,
      text: message,
      confirmButtonColor: '#6499E9',
      ...options,
    });
  }

  static warning(title: string, message?: string, options?: SweetAlertOptions) {
    return Swal.fire({
      icon: 'warning',
      title,
      text: message,
      confirmButtonColor: '#6499E9',
      cancelButtonColor: '#e5e7eb',
      ...options,
    });
  }

  static info(title: string, message?: string, options?: SweetAlertOptions) {
    return Swal.fire({
      icon: 'info',
      title,
      text: message,
      confirmButtonColor: '#6499E9',
      ...options,
    });
  }

  static confirm(
    title: string,
    message: string,
    confirmText: string = 'Yes',
    cancelText: string = 'Cancel',
    options?: SweetAlertOptions
  ) {
    return Swal.fire({
      icon: 'question',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: '#6499E9',
      cancelButtonColor: '#e5e7eb',
      ...options,
    });
  }

  static loading(title: string = 'Loading...', message?: string) {
    Swal.fire({
      icon: 'info',
      title,
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  static close() {
    Swal.close();
  }

  static toast(
    title: string,
    icon: 'success' | 'error' | 'warning' | 'info' = 'success',
    position: 'top' | 'bottom' = 'top'
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: position === 'top' ? 'top-end' : 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    return Toast.fire({
      icon,
      title,
    });
  }
}

export default AlertService;
