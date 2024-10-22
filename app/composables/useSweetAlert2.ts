import Swal from 'sweetalert2';

export const useSweetAlert2 = () => {
  const AlertCuestion = async (title: string, text: string) => {
    return await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#d3d3d3',
    });
  }

  return {
    AlertCuestion
  };
};
