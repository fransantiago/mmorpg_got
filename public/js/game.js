const decreaseSeconds = (function() {
  let timer = null;

  return function() {
    if (timer) {
      window.clearTimeout(timer);
      timer = null;
    }

    $(".remaining-time").each(function() {
      const seconds = $(this).text();

      parseInt(seconds)
        ? $(this).text(parseInt(seconds) - 1)
        : (window.location.href = "/jogo?event=primary");
    });

    timer = window.setTimeout(decreaseSeconds, 1000);
  };
})();

const customAlertMessages = type => {
  const messages = {
    danger: "Preencha os campos corretamente.",
    success: "Ação realizada com sucesso.",
    primary: "Senhor, a atividade ordenada foi finalizada!",
    warning: "Senhor, a sua ordem foi revogada!"
  };

  return $("#alert-messages").append(
    $(`<div class="alert alert-${type} event">
            <strong>${messages[type]}</strong>
        </div>`)
  );
};

const deleteOrder = orderID => {
  $.ajax({
    url: `/pergaminhos/acoes/${orderID}`,
    method: "DELETE"
  })
    .done(data => {
      window.location.href = "/jogo?event=warning";
    })
    .fail(jqXHR => {
      console.log(jqXHR);
    });
};

$(document).ready(() => {
  $("#suditosImg").click(() => {
    $(".event").hide();
    $.ajax({
      url: "/suditos",
      method: "GET",
      success: data => {
        $("#acoes").html(data);
      }
    });
  });

  $("#pergaminhosImg").click(() => {
    $(".event").hide();
    $.ajax({
      url: "/pergaminhos",
      method: "GET",
      success: data => {
        $("#acoes").html(data);

        decreaseSeconds();
      }
    });
  });
});
