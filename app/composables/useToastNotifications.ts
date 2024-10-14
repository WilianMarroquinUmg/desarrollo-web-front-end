
const toast = useToast();

export function useToastNotifications() {
  const notifySuccess = (title: string, descripcion: string) => {
      toast.add({
          title: title,
          description: descripcion,
          icon: 'mdi-check-circle',
      });
  };

    const notifyError = (title: string, descripcion: string) => {
        toast.add({
            title: title,
            description: descripcion,
            color: 'red',
            icon: 'mdi-alert-circle',
        });
    };

  return {
    notifySuccess,
    notifyError,
  };
}

