$(function(){

  //Car page / Report Modal / Pricing
  $(document).on("click", ".modal-primary-report.show .get-report-price-item", function () {
    $('.modal-primary-report.show .get-report-price-item').removeClass('active');
    $(this).addClass('active');

    let price = $('.modal-primary-report.show .get-report-price-item.active .price').text();

    $('.modal-primary-report.show .get-report-btn span').text(price);
  });

  const aahModal = document.getElementById('aahModal');
  aahModal.addEventListener('shown.bs.modal', event => {
    let price = $('.modal-primary-report.show .get-report-price-item.active .price').text();
    $('.modal-primary-report.show .get-report-btn span').text(price);

    $('#aahModalBtn').addClass('active');
  });
  aahModal.addEventListener('hidden.bs.modal', event => {
    $('#aahModalBtn').removeClass('active');
  });

  const carfaxModal = document.getElementById('carfaxModal');
  carfaxModal.addEventListener('shown.bs.modal', event => {
    let price = $('.modal-primary-report.show .get-report-price-item.active .price').text();
    $('.modal-primary-report.show .get-report-btn span').text(price);

    $('#carfaxModalBtn').addClass('active');
  });
  carfaxModal.addEventListener('hidden.bs.modal', event => {
    $('#carfaxModalBtn').removeClass('active');
  });

  const autocheckModal = document.getElementById('autocheckModal');
  autocheckModal.addEventListener('shown.bs.modal', event => {
    let price = $('.modal-primary-report.show .get-report-price-item.active .price').text();
    $('.modal-primary-report.show .get-report-btn span').text(price);

    $('#autocheckModalBtn').addClass('active');
  });
  autocheckModal.addEventListener('hidden.bs.modal', event => {
    $('#autocheckModalBtn').removeClass('active');
  });

  const vindecoderModal = document.getElementById('vindecoderModal');
  vindecoderModal.addEventListener('shown.bs.modal', event => {
    let price = $('.modal-primary-report.show .get-report-price-item.active .price').text();
    $('.modal-primary-report.show .get-report-btn span').text(price);
  });

});
