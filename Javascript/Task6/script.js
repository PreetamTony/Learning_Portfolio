const items = document.querySelectorAll('.item');
let dragged = null;

items.forEach(item => {
    item.addEventListener('dragstart', function() {
        dragged = this;
        setTimeout(() => this.classList.add('drag'), 0);
    });

    item.addEventListener('dragend', function() {
        setTimeout(() => this.classList.remove('drag'), 0);
        dragged = null;
    });

    item.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    item.addEventListener('dragenter', function(e) {
        e.preventDefault();
        if (this !== dragged) {
            this.classList.add('over');
        }
    });

    item.addEventListener('dragleave', function() {
        this.classList.remove('over');
    });

    item.addEventListener('drop', function() {
        this.classList.remove('over');
        if (this !== dragged) {
            const list = this.parentNode;
            const all = Array.from(list.children);
            const draggedId = all.indexOf(dragged);
            const thisId = all.indexOf(this);

            if (draggedId < thisId) {
                list.insertBefore(dragged, this.nextSibling);
            } else {
                list.insertBefore(dragged, this);
            }
        }
    });
});
