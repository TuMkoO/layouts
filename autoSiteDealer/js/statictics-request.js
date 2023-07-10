$(function(){

  const statisticsTab = document.querySelector('button[data-bs-target="#statistics-tab-pane"]')
  statisticsTab.addEventListener('shown.bs.tab', event => {

    try {
      $('.preloader-container').removeClass('d-none');
      $('.request-container').remove();

      $.get('https://autovinapi.com/apiselect.php', async function (data) {
        // console.log(data);


        $('.preloader-container').addClass('d-none');

        $('#statistics-tab-pane').append(`<div class="request-container d-flex justify-content-center"><ul class="request-content"></ul></div>`);

        data.sort((a, b) => a.id - b.id).forEach(item => {
          $('.request-content').append(`<li>${item.id + ': ' + item.name}</li>`);
        });


      });
    } catch (e) {
      console.log(e);
    }

  });


});
