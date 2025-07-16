export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return "Dzień dobry Filip";
  } else if (hour >= 12 && hour < 17) {
    return "Dzień dobry Filip";
  } else if (hour >= 17 && hour < 22) {
    return "Dobry wieczór Filip";
  } else {
    return "Dobranoc Filip";
  }
}

export function getTimeBasedSubtitle(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return "Czas na produktywny dzień";
  } else if (hour >= 12 && hour < 17) {
    return "Czas na realizację planów";
  } else if (hour >= 17 && hour < 22) {
    return "Czas na podsumowanie dnia";
  } else {
    return "Czas na odpoczynek";
  }
}

export function getPersonalizedMessage(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return "Dzień dobry, Filip!";
  } else if (hour >= 12 && hour < 17) {
    return "To już popołudnie, Filip!";
  } else if (hour >= 17 && hour < 22) {
    return "Dobry wieczór, Filip!";
  } else {
    return "Pora na odpoczynek, Filip!";
  }
}