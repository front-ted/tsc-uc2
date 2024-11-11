// START FUNCAO RESIZE
function escalaProporcao(largura, altura) {

    var larguraScreen = $(window).width();
    var alturaScreen = $(window).height();
    var proporcaoAltura = (alturaScreen * 100) / altura;
    var proporcaoLargura = (larguraScreen * 100) / largura;
    var proporcao, larguraAltura, larguraAlturaAuto;

    if (proporcaoAltura < proporcaoLargura) {
        larguraAltura = "height";
        larguraAlturaAuto = "width";
        proporcao = proporcaoAltura / 100;
    } else {
        larguraAltura = "width";
        larguraAlturaAuto = "height";
        proporcao = proporcaoLargura / 100;
    }

    console.log(proporcao, larguraAltura, larguraAlturaAuto)
    return [proporcao, larguraAltura, larguraAlturaAuto];

}

function resizeBodyConteudo() {

    var proporcao1920 = escalaProporcao(1920, 1080)[0];

    $(".wrapper").css({
        "transform": "scale(" + proporcao1920 + ")",
        "transform-origin": "center center"
    });

    if (Number($(window).width()) >= 1920) {
        if ($(window).width() > $(window).height()) {
            $(".centralizar-obj").css({
                "width": ($(window).width() * (16 / 9)),
                "height": "auto",
                "padding-top": "56.25%"
            })
        }
    }
    var proporcao900;

    if ($(window).width() < 992) {
        proporcao900 = escalaProporcao(900, 576)[0];
    } else {
        proporcao900 = 1;
    }
}

$(document).ready(function () {
    resizeBodyConteudo();
    $(window).resize(function () {
        resizeBodyConteudo();
    })
});
// END FUNCAO RESIZE
$('.tela-2').hide();
$('.tela-3').hide();
$('.tela-4').hide();
$('.tela-5').hide();
$('.tela-6').hide();
$('.tela-7').hide();
$('.backdrop').hide();
$('.tela-final').hide();
window.onload = () => {
    $('.cena-ui').hide();
    $('.vestimenta-ui').hide();
    $('.personagem-container img').hide();
    $('.tela-2 .msg p:nth-of-type(2)').hide();
    setTimeout(() => {
        $('.loader').fadeOut();
        setTimeout(() => {
            $('.tela-1').fadeOut();
            setTimeout(() => {
                $('.tela-2').fadeIn();
            }, 750);
        }, 2500);
    }, 1000);
}

$('.start-btn').click(function () {
    const next = $(this).parents('.tela').next()
    $(this).parents('.tela').fadeOut();
    setTimeout(() => {
        next.fadeIn();
    }, 1000);
});

$('.gen-selector').click(function () {
    $('.tela-3 .msg').fadeOut();
    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
    } else {
        $('.gen-selector.active').removeClass('active');
        $(this).addClass('active');
    }
});

// ESCREVER FUNÇÃO P SELEÇÃO DE GENERO
let genero;
let generoNaoSelecionado;
$('.confirmar-selecao').click(function () {
    genero = $('.gen-selector.active')[0].dataset.selector;
    if (genero == 'masculino') { generoNaoSelecionado = 'feminino'; } else { generoNaoSelecionado = 'masculino'; }
    $(`.img-${generoNaoSelecionado}`).hide();
    $(`.vestuario-${generoNaoSelecionado}`).hide();
    const next = $(this).parents('.tela').next()
    $(this).parents('.tela').fadeOut();
    setTimeout(() => {
        next.fadeIn();
        setTimeout(() => {
            $('.tela-4 .cena-ui').fadeIn();
            if (localStorage.getItem('tutorial-dicas') != 'feito') {
                setTimeout(() => {
                    $('.backdrop').fadeIn();
                }, 1250);
            }
        }, 1000);
    }, 1000);
});

$('.aba-roupas').click(function () {
    let vestimentaUi = $(this).parents('.dialog').find('.vestimenta-ui');
    let dialogMsg = $(this).parents('.dialog').find('.msg');
    dialogMsg.toggle()
    vestimentaUi.toggle();
    $(this).addClass('ativo');
    $(this).prev().removeClass('ativo');
});

$('.aba-info').click(function () {
    let vestimentaUi = $(this).parents('.dialog').find('.vestimenta-ui');
    let dialogMsg = $(this).parents('.dialog').find('.msg');
    vestimentaUi.toggle();
    dialogMsg.toggle();
    $(this).addClass('ativo');
    $(this).next().removeClass('ativo');
});

$('.roupa-select').click(function () {
    let roupaNro = $(this)[0].dataset.roupa;
    if ($('.personagem-container .active').length > 0) {
        $('.personagem-container .active').fadeOut();
        $('.personagem-container .active').removeClass('active');
        setTimeout(() => {
            checkResult(roupaNro);
        }, 750);
    } else {
        checkResult(roupaNro);
    }
})

// funcao p checar resultado e abrir modal de feedback:
function checkResult(roupaNro) {
    let modalfeedbackpositivo1 = new bootstrap.Modal(document.getElementById('modal-positivo'));
    let modalfeedbacknegativo = new bootstrap.Modal(document.getElementById('modal-negativo'));
    $(`.img-${genero} .roupa-${roupaNro}`).addClass('active');
    $(`.img-${genero} .roupa-${roupaNro}`).fadeIn();
    setTimeout(() => {
        if ($('.personagem-container .active').hasClass('correto')) {
            var audio = new Audio();
            audio.setAttribute('src', 'assets/audios/acerto.mp3'); //change the source
            audio.load(); //load the new source
            audio.play(); //play
            modalfeedbackpositivo1.toggle();
        } else {
            var audio = new Audio();
            audio.setAttribute('src', 'assets/audios/erro.mp3'); //change the source
            audio.load(); //load the new source
            audio.play(); //play
            modalfeedbacknegativo.toggle();
        }
    }, 750);
}

$('#modal-positivo').on('hidden.bs.modal', function (event) {
    setTimeout(() => {
        let telaAtual = $('.personagem-container .active').parents('.tela');
        let proxTela = telaAtual.next();
        $(telaAtual).fadeOut();
        setTimeout(() => {
            $('personagem-container .active').removeClass('active');
            $(proxTela).fadeIn();
            let ui = $(proxTela).find('.cena-ui');
            $(ui).fadeIn();
        }, 500);
    }, 1000);
})
$('.dicas-tutorial').on('hidden.bs.modal', function () {
    $('.backdrop').fadeOut();
    localStorage.setItem('tutorial-dicas', 'feito')
})
$('.btn-next').click(function () {
    $('.tela-2 .msg p:nth-of-type(1)').fadeOut();
    setTimeout(() => {
        $('.tela-2 .msg p:nth-of-type(2)').fadeIn();
        $('.start-btn').removeClass('disabled');
    }, 800);
    $(this).addClass('disabled');
    $(this).prev().removeClass('disabled');
});

$('.btn-prev').click(function () {
    $('.tela-2 .msg p:nth-of-type(2)').fadeOut();
    setTimeout(() => {
        $('.tela-2 .msg p:nth-of-type(1)').fadeIn();
    }, 800);
    $(this).addClass('disabled');
    $(this).next().removeClass('disabled');
});

$('.restart-btn').click(function () {
    $('.btn-prev').click();
    $('.aba-info').click();
    $('.tela-3 .msg').show();
    $('.img-masculino').show();
    $('.img-feminino').show();
    $('.vestuario-masculino').show();
    $('.vestuario-feminino').show();
    $('.tela-final').fadeOut();
    setTimeout(() => {
        $('.tela-2').fadeIn();
    }, 750);
})

$('.btn-dicas').click(function () {
    const telaAtual = $(this).parents('.tela');
    if (genero == 'masculino') {
        if (telaAtual[0].classList.contains('tela-4')) {
            let modalDicasMasc = new bootstrap.Modal(document.getElementById('modal-dicas-masc-1'));
            modalDicasMasc.toggle();
        }
        if (telaAtual[0].classList.contains('tela-5')) {
            let modalDicasMasc = new bootstrap.Modal(document.getElementById('modal-dicas-masc-2'));
            modalDicasMasc.toggle();
        }
        if (telaAtual[0].classList.contains('tela-6')) {
            let modalDicasMasc = new bootstrap.Modal(document.getElementById('modal-dicas-masc-3'));
            modalDicasMasc.toggle();
        }
        if (telaAtual[0].classList.contains('tela-7')) {
            let modalDicasMasc = new bootstrap.Modal(document.getElementById('modal-dicas-masc-4'));
            modalDicasMasc.toggle();
        }
    }
    if (genero == 'feminino') {
        if (telaAtual[0].classList.contains('tela-4')) {
            let modalDicasFem = new bootstrap.Modal(document.getElementById('modal-dicas-fem-1'));
            modalDicasFem.toggle();
        }
        if (telaAtual[0].classList.contains('tela-5')) {
            let modalDicasFem = new bootstrap.Modal(document.getElementById('modal-dicas-fem-2'));
            modalDicasFem.toggle();
        }
        if (telaAtual[0].classList.contains('tela-6')) {
            let modalDicasFem = new bootstrap.Modal(document.getElementById('modal-dicas-fem-3'));
            modalDicasFem.toggle();
        }
        if (telaAtual[0].classList.contains('tela-7')) {
            let modalDicasFem = new bootstrap.Modal(document.getElementById('modal-dicas-fem-4'));
            modalDicasFem.toggle();
        }

    }
})