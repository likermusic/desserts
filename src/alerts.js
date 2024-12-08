export const showNotification = (mes) => {
  const notification = document.querySelector(".notification");
  notification.textContent = mes;
  notification.classList.remove("hidden");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hidden");
  }, 2000);
};
