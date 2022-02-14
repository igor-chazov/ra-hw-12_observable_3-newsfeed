import { ajax } from 'rxjs/ajax';
import { map, switchMap, retryWhen, delay, filter } from 'rxjs/operators';
import { readNews, readNewsSuccess } from '../reducers/newsFeedSlice';
import links from '../utils/links';

const newsUrl = links.news;

export const requestNewsEpic = (action$, state$) => action$.pipe(
  filter(o => readNews.match(o)),
  map(() => {
    const items = state$.value.newsFeed.items;
    if (!items.length) {
      return newsUrl;
    }
    const lastItem = items[items.length - 1];
    return `${newsUrl}?lastSeenId=${lastItem.id}`;
  }),
  switchMap(o =>
    ajax.getJSON(o).pipe(
      map(o => readNewsSuccess(o)),
      retryWhen(errors => errors.pipe(delay(3000))),
    )
  )
);
