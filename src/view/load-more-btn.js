
import AbstractView from './abstract';

const createLoadButtonTemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class LoadMoreButton extends AbstractView {

  getTemplate() {
    return createLoadButtonTemplate();
  }
}
