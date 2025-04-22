import Swal from 'sweetalert2'

export const useSwal = () =>
  Swal.mixin({
    customClass: {
      confirmButton: 'bg-green-600 text-white px-4 py-2 mx-4 rounded hover:bg-green-700',
      cancelButton: 'bg-gray-300 text-gray-700 px-4 py-2 mx-4 rounded hover:bg-gray-400'
    },
    buttonsStyling: false
  })
