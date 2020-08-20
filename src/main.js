import {renderTemplate, renderElement, RenderPosition} from './utils.js';
import SiteMenu from './view/site-menu.js';
import LoadMoreButtonView from './view/load-more-btn.js';
import {createFilterTemplate as filter} from './view/filter.js';
import SortView from './view/tasks-sort.js';
import {createTaskFormTemplate} from "./view/task-edit.js";
import {generateTask, createTaskTemplate} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_AMOUNT = 20;
const TASK_COUNT_PER_STEP = 8;
const content = document.querySelector(`.main`);
const control = content.querySelector(`.control`);
const boardContainer = content.querySelector(`.board`);
const taskListContainer = boardContainer.querySelector(`.board__tasks`);

const tasks = new Array(TASK_AMOUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const addTasks = (container, position) => {
  for (let i = 1; i <= Math.min(tasks.length, TASK_COUNT_PER_STEP); i += 1) {
    renderTemplate(container, createTaskTemplate(tasks[i]), position);
  }
};

renderElement(control, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
renderTemplate(control, filter(filters), `afterend`);
renderElement(boardContainer, new SortView().getElement(), RenderPosition.AFTERBEGIN);
renderTemplate(taskListContainer, createTaskFormTemplate(tasks[0]), `afterbegin`);
addTasks(taskListContainer, `beforeend`);


if (tasks.length > TASK_COUNT_PER_STEP) {

  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();

  renderElement(boardContainer, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderTemplate(taskListContainer, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
