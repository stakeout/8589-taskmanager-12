import {renderHtmlElement} from './utils';
import {createMenuTemplate as menu} from './view/site-menu';
import {createTaskFiltersTemplate as filter} from './view/filter';
import {createCardsSortTemplate as sort} from './view/tasks-sort';
// import {createTaskFormTemplate as form} from './view/task-edit';
// import {createTaskCardTemplate as task} from './view/task';
import {createLoadButtonTemplate as loadMoreBtn} from './view/load-more-btn';
import {generateTask, createTaskTemplate} from "./mock/task";
import {createTaskFormTemplate} from "./mock/edit-task";

const TASK_AMOUNT = 10;
const content = document.querySelector(`.main`);
const control = content.querySelector(`.control`);
const boardContainer = content.querySelector(`.board`);
const taskListContainer = boardContainer.querySelector(`.board__tasks`);

const tasks = new Array(TASK_AMOUNT).fill().map(generateTask);

const addTasks = (container, position) => {
  const length = tasks.length - 1;
  for (let i = 1; i <= length; i += 1) {
    renderHtmlElement(container, createTaskTemplate(tasks[i]), position);
  }
};

renderHtmlElement(control, menu(), `beforeend`);
renderHtmlElement(control, filter(), `afterend`);
renderHtmlElement(boardContainer, sort(), `afterbegin`);
renderHtmlElement(taskListContainer, createTaskFormTemplate(tasks[0]), `afterbegin`);
addTasks(taskListContainer, `beforeend`);
renderHtmlElement(boardContainer, loadMoreBtn(), `beforeend`);
