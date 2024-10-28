document.addEventListener('DOMContentLoaded', function() { 
    const button = document.querySelector('.scroll-button');

    window.addEventListener('scroll', function() {
        if (this.window.scrollY > 450) {
            button.classList.remove('scroll-button--hidden');
        } else {
            if (!button.classList.contains('scroll-button--hidden')) {
                button.classList.add('scroll-button--hidden');
            }
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });
});