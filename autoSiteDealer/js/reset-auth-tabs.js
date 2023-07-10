$(function(){

  //Reset Tabs Login/Recovery password
  const loginTab = document.querySelector('button[data-bs-target="#login-tab-pane"]')
  loginTab.addEventListener('shown.bs.tab', event => {
    const prevTabLinkEl = $('.nav-auth .active').closest('li').prev('li').find('a')[0];
    if (prevTabLinkEl) {
      const prevTab = new bootstrap.Tab(prevTabLinkEl);
      prevTab.show();
    }
  });


});
