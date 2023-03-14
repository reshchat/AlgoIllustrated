const boxes = document.querySelectorAll('.box');

function toggleBox() {
  this.classList.toggle('expanded');
  const subLinks = this.querySelector('.sub-links');
  if (subLinks) {
    subLinks.style.display = this.classList.contains('expanded') ? 'flex' : 'none';
  }
}

boxes.forEach(box => {
  box.addEventListener('click', toggleBox);
  box.innerHTML += '<div class="sub-links"><a href="#">a1</a><a href="#">a2</a><a href="#">a3</a></div>';
});