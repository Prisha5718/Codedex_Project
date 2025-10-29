document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const modalCloseButton = document.getElementById('modal-close');
    
    // Function to open the modal
    const openModal = (title, desc, stack) => {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-desc').textContent = desc;
        document.getElementById('modal-stack').textContent = stack;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close the modal
    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    // Add click listeners to all "Info" buttons
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const desc = button.getAttribute('data-desc');
            const stack = button.getAttribute('data-stack');
            openModal(title, desc, stack);
        });
    });

    // Add click listener to the close button
    modalCloseButton.addEventListener('click', closeModal);

    // Add click listener to the modal background to close it
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});

// Diagnostic: check hero image load and show a small toast + console message so you can see immediately on the page
document.addEventListener('DOMContentLoaded', () => {
    function showStatus(msg, ok) {
        const el = document.createElement('div');
        el.textContent = msg;
        el.style.position = 'fixed';
        el.style.right = '12px';
        el.style.top = '72px';
        el.style.padding = '8px 12px';
        el.style.background = ok ? 'rgba(16,185,129,0.92)' : 'rgba(239,68,68,0.95)';
        el.style.color = '#fff';
        el.style.zIndex = 99999;
        el.style.borderRadius = '6px';
        el.style.fontFamily = 'Inter, sans-serif';
        el.style.boxShadow = '0 6px 18px rgba(0,0,0,0.4)';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }

    const heroImg = document.getElementById('hero-img');
    if (!heroImg) {
        console.warn('Hero image element not found (#hero-img)');
        showStatus('Hero image element not found', false);
        return;
    }

    heroImg.addEventListener('load', () => {
        console.log('Hero image loaded successfully');
        showStatus('Hero image loaded', true);
    });
    heroImg.addEventListener('error', () => {
        console.error('Hero image failed to load');
        showStatus('Hero image failed to load', false);
    });

    // If already cached and complete
    if (heroImg.complete && heroImg.naturalWidth > 0) {
        console.log('Hero image is already loaded (cache)');
        showStatus('Hero image loaded', true);
    }
});
