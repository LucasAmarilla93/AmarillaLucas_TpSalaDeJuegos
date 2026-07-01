import Swal from "sweetalert2";

export class Toast {
private static toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  static fire(options: {
    icon: 'success' | 'error' | 'warning' | 'info' | 'question';
    title: string;
    text: string;
  }) {
    this.toast.fire(options);
  }

}
