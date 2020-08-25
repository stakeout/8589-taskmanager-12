import {render, RenderPosition} from "./utils/render.js";
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

import BoardPresenter from "./presenter/board.js";

const TASK_AMOUNT = 20;

const tasks = new Array(TASK_AMOUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const control = siteMainElement.querySelector(`.control`);

const boardPresenter = new BoardPresenter(siteMainElement);

render(control, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

boardPresenter.init(tasks);
