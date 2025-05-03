import Swal from 'sweetalert2'

export const useSwal = () =>
  Swal.mixin({
    customClass: {
      confirmButton: 'bg-green-600 text-white px-4 py-2 mx-4 rounded hover:bg-green-700',
      cancelButton: 'bg-gray-300 text-gray-700 px-4 py-2 mx-4 rounded hover:bg-gray-400',
      popup: 'p-6',
      title: 'text-xl font-semibold mb-4',
      input: 'border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
    },
    buttonsStyling: false
  })
