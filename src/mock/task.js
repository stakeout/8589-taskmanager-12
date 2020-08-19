import {COLORS} from "../consts.js";
import {getRandomInteger, isTaskExpired, isTaskRepeating, humanizeTaskDueDate} from "../utils.js";

const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Завершить проект`,
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generateRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);
  return COLORS[randomIndex];
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

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false
  };
};


export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = (dueDate === null)
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: generateDescription(),
    dueDate,
    isRepeat: getRandomInteger(),
    repeating,
    color: generateRandomColor(),
    isArchive: getRandomInteger(),
    isFavorite: getRandomInteger(),
  };
};

export const createTaskTemplate = (task) => {
  const {
    color,
    description,
    dueDate,
    repeating,
    isArchive,
    isFavorite,
  } = task;

  const date = dueDate !== null
    ? humanizeTaskDueDate(dueDate)
    : ``;
  const deadlineClassName = isTaskExpired(dueDate) ? `card--deadline` : ``;

  const repeatClassName = isTaskRepeating(repeating)
    ? `card--repeat`
    : ``;

  const archiveClassName = isArchive
    ? `card__btn--archive card__btn--disabled`
    : `card__btn--archive`;

  const favoriteClassName = isFavorite
    ? `card__btn--favorites card__btn--disabled`
    : `card__btn--favorites`;
  return (`
      <article class="card card--${color} ${deadlineClassName} ${repeatClassName}">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn ${archiveClassName}">
                archive
              </button>
              <button
                type="button"
                class="card__btn ${favoriteClassName}"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <p class="card__text">${description}</p>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <div class="card__date-deadline">
                    <p class="card__input-deadline-wrap">
                      <span class="card__date">${date}</span>
                      <span class="card__time">16:15</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    `);
};
