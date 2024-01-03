document.addEventListener("DOMContentLoaded", function () {
  var chatBox = document.getElementById("chat-box");
  var messageInput = document.getElementById("message");
  var sendButton = document.getElementById("sendButton");
  var isFirstLoad = true;

  // Limpar a caixa de chat quando a página é aberta
  chatBox.innerHTML = "";

  // Função para adicionar mensagens à caixa de chat
  function addMessage(message) {
    var messageElement = document.createElement("p");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Lidar com o clique no botão "Enviar"
  sendButton.addEventListener("click", function () {
    var message = messageInput.value.trim();
    if (message !== "") {
      addMessage("Você: " + message);

      // Simular o envio para outras abas (usando armazenamento local)
      localStorage.setItem("chatMessage", "Outra pessoa: " + message);

      // Limpar o campo de entrada
      messageInput.value = "";
    }
  });

  // Lidar com a tecla Enter no campo de entrada
  messageInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendButton.click(); // Simular um clique no botão "Enviar"
    }
  });

  // Verificar e exibir mensagens armazenadas no localStorage
  function loadMessages() {
    var storedMessage = localStorage.getItem("chatMessage");
    if (isFirstLoad) {
      isFirstLoad = false;
      return;
    }
    if (storedMessage && storedMessage.startsWith("Outra pessoa:")) {
      addMessage(storedMessage);
      // Limpar a mensagem armazenada para evitar repetições
      localStorage.removeItem("chatMessage");
    }
  }

  // Carregar mensagens ao carregar a página
  loadMessages();

  // Ouvir o evento de mudança no localStorage
  window.addEventListener("storage", function (event) {
    if (
      event.key === "chatMessage" &&
      event.newValue.startsWith("Outra pessoa:")
    ) { 
      addMessage(event.newValue);
    }
  });
});
