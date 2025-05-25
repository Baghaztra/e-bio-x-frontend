import Swal from "sweetalert2";

export const useSwal = () => {
  let isDark = false;

  if (process.client) {
    isDark = document.documentElement.classList.contains("dark");
  }

  return Swal.mixin({
    customClass: {
      confirmButton: "bg-green-600 text-white px-4 py-2 mx-4 rounded hover:bg-green-700",
      cancelButton: "bg-gray-300 text-gray-700 px-4 py-2 mx-4 rounded hover:bg-gray-400",
      popup: `p-6 ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`,
      title: "text-xl font-semibold mb-4",
      input:
        "border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 dark:bg-gray-700 dark:text-white",
    },
    buttonsStyling: false,
  });
};
