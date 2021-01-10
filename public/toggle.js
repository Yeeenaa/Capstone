const toggleBtn = document.querySelector('.toggle-btn');
const menu = document.querySelector('#menu-items ul');

toggleBtn.addEventListener('click', () => {
	menu.classList.toggle('active');
});