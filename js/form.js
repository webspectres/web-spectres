const form = document.getElementById('contactForm');
const submitButton = document.getElementById('c-submit');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitButton.textContent = 'Sending...';
    setTimeout(() => {
        submitButton.textContent = 'Successfully Sent'; 
        submitButton.classList.add('success');  
        formMessage.style.display = 'block';  
        form.reset();  
    }, 2500); 

    const formData = new FormData(form);

    try {
        const response = fetch('https://formsubmit.co/97787088328bc67cb29ee111b31c632f', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        }).then(response => {
            if (!response.ok) {
                alert('There was a problem submitting your message. Please try again.');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});