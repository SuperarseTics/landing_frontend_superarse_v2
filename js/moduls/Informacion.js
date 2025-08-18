document.addEventListener('DOMContentLoaded', () => {
  const statItems = document.querySelectorAll('.stat-item');

  const animateNumbers = (element) => {
    const numberElement = element.querySelector('.number');
    const finalValue = parseInt(numberElement.textContent, 10);
    let currentValue = 0;
    const increment = finalValue / 100;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        currentValue = finalValue;
        clearInterval(timer);
      }
      numberElement.textContent = Math.floor(currentValue);
    }, 20);
  };

  statItems.forEach(item => {
    animateNumbers(item);
  });
});