// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const errorModal = document.getElementById('modal');
  errorModal.classList.add('hidden');

  let isLiked = false

  const heartElement = document.querySelector('.like-glyph');
  heartElement.addEventListener('click', () => {
    mimicServerCall()
      .then(() => {
        if (isLiked) {
          // Change heart back to empty and remove activated-heart class
          heartElement.innerHTML = EMPTY_HEART;
          heartElement.classList.remove('activated-heart');
          isLiked = false;
        } else {
          // Change heart to full and add activated-heart class on success
          heartElement.innerHTML = FULL_HEART;
          heartElement.classList.add('activated-heart');
          isLiked = true;
        }
      })
      .catch((error) => {
        // Display error modal on failure
        const modalMessage = document.querySelector('#modal-message');
        modalMessage.textContent = error;
        errorModal.classList.remove('hidden');
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  });

  // Handling full heart clicks
  // heartElement.addEventListener('click', () => {
  //   if(heartElement.innerHTML === FULL_HEART){
  //     heartElement.innerHTML = EMPTY_HEART
  //     heartElement.classList.remove('activated-heart')
  //   } 
  // });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}