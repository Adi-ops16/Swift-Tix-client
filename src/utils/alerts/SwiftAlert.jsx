import Swal from 'sweetalert2';

const SwiftAlert = async ({ title, text, icon, confirmText } = {}) => {

    const res = await Swal.fire({
        title: title || "Congratulation",
        text: text || "Query is complete",
        icon: icon || "success",

        // Modal background
        background: "oklch(95% 0.03 85)",
        color: "oklch(25% 0.03 85)",

        // Remove default shadows
        showConfirmButton: true,
        confirmButtonText: confirmText || "Okay",
        customClass: {
            popup: "swift-popup",
            title: "swift-title",
            htmlContainer: "swift-text",
            confirmButton: "swift-btn my-gradient hover-gradient !swal2-no-padding",
            cancelButton: "swift-btn-cancel !swal2-no-padding",
        },
    });;

    return res;
};

export default SwiftAlert;