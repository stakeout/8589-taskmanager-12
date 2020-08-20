import {renderTemplate, renderElement, RenderPosition} from './utils.js';
import SiteMenu from './view/site-menu.js';
import FilterView from './view/filter.js';
import SortView from './view/tasks-sort.js';
import BoardView from './view/board.js';
import TaskListView from './view/task-list.js';
import TaskView from './view/task.js';
import LoadMoreButtonView from './view/load-more-btn.js';
import {createTaskFormTemplate} from "./view/task-edit.js";
import {generateTask, createTaskTemplate} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_AMOUNT = 20;
const TASK_COUNT_PER_STEP = 8;
const siteMainElement = document.querySelector(`.main`);
const control = siteMainElement.querySelector(`.control`);
const boardComponent = new BoardView();

const tasks = new Array(TASK_AMOUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const addTasks = (container, position) => {
  for (let i = 1; i <= Math.min(tasks.length, TASK_COUNT_PER_STEP); i += 1) {
    renderElement(container, new TaskView(tasks[i]).getElement(), position);
  }
};

renderElement(control, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(boardComponent.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);
const taskListComponent = new TaskListView();
renderElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
// renderTemplate(taskListContainer, createTaskFormTemplate(tasks[0]), `afterbegin`);
addTasks(taskListComponent.getElement(), RenderPosition.BEFOREEND);


if (tasks.length > TASK_COUNT_PER_STEP) {

  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();

  renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderElement(taskListComponent.getElement(), new TaskView(task).getElement(), RenderPosition.BEFOREEND));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
