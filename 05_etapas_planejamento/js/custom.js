// caixas expansiveis
$('.caixa-container button.btpluscaixa').click(function(){
    let caixa = $(this).prev()
    if(caixa.hasClass('aberta')){
        caixa.removeClass('aberta')
        $(this).css('background-image', 'url("img/mais.png")')
    } else {
        caixa.addClass('aberta')
        $(this).css('background-image', 'url("img/menos.png")')
    }
  })

 