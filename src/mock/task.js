const getRandomInteger = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Завершить проект`,
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};


const generateTask = () => {
  const dueDate = generateDate();
  return {
    description: generateDescription(),
    dueDate,
    isRepeat: false,
    repeating: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    },
    color: `black`,
    isArchive: false,
    isFavorite: false,
  };
};
