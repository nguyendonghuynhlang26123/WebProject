const displayToast = (text, timeOut) => {
  let toast = document.getElementById("toast");
  toast.innerHTML = text;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.innerHTML = "";
  }, timeOut);
};
