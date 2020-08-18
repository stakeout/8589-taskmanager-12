import {renderHtmlElement} from './utils';
import {createMenuTemplate as menu} from './view/site-menu';
import {createFilterTemplate as filter} from './view/filter';
import {createCardsSortTemplate as sort} from './view/tasks-sort';
// import {createTaskFormTemplate as form} from './view/task-edit';
// import {createTaskCardTemplate as task} from './view/task';
import {createLoadButtonTemplate as loadMoreBtn} from './view/load-more-btn';
import {createTaskFormTemplate} from "./view/task-edit";
import {generateTask, createTaskTemplate} from "./mock/task";
import {generateFilter} from "./mock/filter.js";

const TASK_AMOUNT = 20;
const TASK_COUNT_PER_STEP = 8;
const content = document.querySelector(`.main`);
const control = content.querySelector(`.control`);
const boardContainer = content.querySelector(`.board`);
const taskListContainer = boardContainer.querySelector(`.board__tasks`);

const tasks = new Array(TASK_AMOUNT).fill().map(generateTask);
const filters = generateFilter(tasks);
console.log(filters);

const addTasks = (container, position) => {
  for (let i = 1; i <= Math.min(tasks.length, TASK_COUNT_PER_STEP); i += 1) {
    renderHtmlElement(container, createTaskTemplate(tasks[i]), position);
  }
};

renderHtmlElement(control, menu(), `beforeend`);
renderHtmlElement(control, filter(filters), `afterend`);
renderHtmlElement(boardContainer, sort(), `afterbegin`);
renderHtmlElement(taskListContainer, createTaskFormTemplate(tasks[0]), `afterbegin`);
addTasks(taskListContainer, `beforeend`);

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  renderHtmlElement(boardContainer, loadMoreBtn(), `beforeend`);

  const loadMoreButton = boardContainer.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderHtmlElement(taskListContainer, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
