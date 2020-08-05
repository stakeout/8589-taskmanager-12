import {renderHtmlElement} from './utils';
import {createMenuTemplate as menu} from './view/site-menu';
import {createTaskFiltersTemplate as filter} from './view/filter';
import {createCardsSortTemplate as sort} from './view/tasks-sort';
import {createTaskFormTemplate as form} from './view/task-edit';
import {createTaskCardTemplate as task} from './view/task';
import {createLoadButtonTemplate as loadMoreBtn} from './view/load-more-btn';
import {generateTask} from "./mock/task.js";

const TASK_AMOUNT = 3;
const TASK_COUNT = 5;
const content = document.querySelector(`.main`);
const control = content.querySelector(`.control`);
const boardContainer = content.querySelector(`.board`);
const taskListContainer = boardContainer.querySelector(`.board__tasks`);

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const addTasks = (container, position) => {
  for (let i = 0; i < TASK_AMOUNT; i += 1) {
    renderHtmlElement(container, task(), position);
  }
};

renderHtmlElement(control, menu(), `beforeend`);
renderHtmlElement(control, filter(), `afterend`);
renderHtmlElement(boardContainer, sort(), `afterbegin`);
renderHtmlElement(taskListContainer, form(), `beforeend`);
addTasks(taskListContainer, `beforeend`);
renderHtmlElement(boardContainer, loadMoreBtn(), `beforeend`);
