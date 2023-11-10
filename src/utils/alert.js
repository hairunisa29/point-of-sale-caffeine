import Swal from "sweetalert2";

export const PopUpAlert = (title, text, icon) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#2457ca",
  });
};
