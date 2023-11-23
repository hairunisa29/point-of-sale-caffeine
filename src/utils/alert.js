import Swal from "sweetalert2";

export const PopUpAlert = (title, text, icon) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#2457ca",
  });
};

export const ConfirmAlert = (title) => {
  return Swal.fire({
    title,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
    confirmButtonColor: "#2457ca",
  });
};
