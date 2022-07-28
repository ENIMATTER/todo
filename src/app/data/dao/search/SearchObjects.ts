export class CategorySearchValues{
  title: string = null;
}

export class TaskSearchValues{

  title = '';
  completed: number = null;
  priorityId: number = null;
  categoryId: number = null;
  pageNumber = 0;
  pageSize = 5;

  sortColumn = 'title';
  sortDirection = 'asc';

}

export class PrioritySearchValues{
  title: string = null;
}
