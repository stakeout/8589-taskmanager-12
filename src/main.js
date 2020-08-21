import {render, RenderPosition} from './utils.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import SortView from './view/tasks-sort.js';
import BoardView from './view/board.js';
import TaskListView from './view/task-list.js';
import TaskView from './view/task.js';
import NoTaskView from './view/no-task.js';
import LoadMoreButtonView from './view/load-more-btn.js';
import TaskEditView from "./view/task-edit.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_AMOUNT = 20;
const TASK_COUNT_PER_STEP = 8;

const boardComponent = new BoardView();

const siteMainElement = document.querySelector(`.main`);
const control = siteMainElement.querySelector(`.control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  // eslint-disable-next-line no-unused-vars
  const taskEditComponent = new TaskEditView(task);
  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};


const tasks = new Array(TASK_AMOUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

render(control, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

if (tasks.every((task) => task.isArchive)) {
  render(boardComponent.getElement(), new NoTaskView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);

  const taskListComponent = new TaskListView();
  render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i += 1) {
    renderTask(taskListComponent.getElement(), tasks[i]);
  }

  if (tasks.length > TASK_COUNT_PER_STEP) {

    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderTask(taskListComponent.getElement(), task));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= tasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
}
