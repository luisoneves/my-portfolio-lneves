document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const htmlElement = document.documentElement;

  // Verifica se a preferência de dark mode está armazenada no localStorage
  const isDarkMode = localStorage.getItem('isDarkMode') === 'true';

  if (isDarkMode) {
    htmlElement.classList.add('dark');
  }

  // Adiciona evento de clique ao botão de toggle
  darkModeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');

    // Atualiza a preferência no localStorage
    const newIsDarkMode = htmlElement.classList.contains('dark');
    localStorage.setItem('isDarkMode', newIsDarkMode);
  });
});
