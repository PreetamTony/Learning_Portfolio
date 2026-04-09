const gallery = document.querySelector('.gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close');

function openModal(src) {
    if (!src) return;
    modalImg.src = src;
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
    modalImg.src = "";
}

gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        openModal(e.target.dataset.src);
    }
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (!modalImg.contains(e.target)) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
