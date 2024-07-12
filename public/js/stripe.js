/*eslint-disable*/
const stripe = Stripe(
  'pk_test_51PaiCECqYOaCTmPCnCMhevr0SXmWwDkrEn09plVh2rbawnbDCryPk0iBf1LuxeSPddG4V7fhYhwd95RO6UBhYPtf00e3wpsZBu'
);

const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

const bookBtn = document.getElementById('book-tour');

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
