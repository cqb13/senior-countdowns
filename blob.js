var cursor = document.querySelector(".blob");

document.addEventListener("mousemove", function (e) {
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});
