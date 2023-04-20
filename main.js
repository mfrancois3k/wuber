import dotenv from 'dotenv';

const __dirname = new URL('.', import.meta.url).pathname;

if (process.env.NODE_ENV) {
  dotenv.config({ path: `${__dirname}/.env.${process.env.NODE_ENV}`,
})

 } else {
  dotenv.config();
 }

/* eslint-disable */


  console.log( `${__dirname}/.env.${process.env.NODE_ENV}`);

  
const homeSection = document.getElementById('home-section');
const doneSection = document.getElementById('done-section');
const signupForm = document.getElementById('form01');
const formId = process.env.CONVERTKIT_FORM_ID;
const apiUrl = `https://api.convertkit.com/v3/forms/${formId}/subscriptions`;

// Use event delegation to handle form submission
document.addEventListener('submit', async function(event) {
  if (event.target === signupForm) {
    event.preventDefault();

    // Validate form input before submitting
    const email = event.target.email.value;
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: new FormData(event.target),
      });
      
      if (response.ok) {
        // Hide the form and show the "Thank you" message
        alert('Thanks for subscribing!');
      } else {
        throw new Error('API request failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  }
});

// Use comments to explain the code
// Handle the "load" event to add a loading animation and remove it after 1.1 seconds
window.addEventListener('load', function() {
  setTimeout(() => {
    document.body.classList.remove('is-loading');
    homeSection.style.display = 'none';
    doneSection.style.display = 'block';
    document.body.classList.add('is-playing');
    setTimeout(() => {
      document.body.classList.add('is-ready');
      document.body.classList.remove('is-playing');
    }, 2000);
  }, 300);
});



