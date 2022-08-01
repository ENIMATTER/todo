import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DeviceDetectorService} from "ngx-device-detector";
import {TaskSearchValues} from "../../data/dao/search/SearchObjects";
import {Category} from "../../model/Category";
import {Task} from "../../model/Task";
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Priority} from "../../model/Priority";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

// "presentational component": отображает полученные данные и отправляет какие-либо действия обработчику
// назначение - работа со списком задач
export class TaskListComponent implements OnInit {

  // ----------------------- входящие параметры ----------------------------

  // переменные для настройки постраничности должны быть проинициализированы первыми (до обновления tasks)
  // чтобы компонент постраничности правильно отработал

  @Input()
  totalTasksFounded: number; // сколько всего задач найдено

  @Input()
  showSearch: boolean;

  // задачи для отображения на странице
  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.assignTableSource();   // передать данные таблице для отображения задач
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  // все возможные параметры для поиска задач
  @Input('taskSearchValues')
  set setTaskSearchValues(taskSearchValues: TaskSearchValues) {
    this.taskSearchValues = taskSearchValues;
    this.initSearchValues();
    this.initSortDirectionIcon();
  }

  @Input()
  selectedCategory: Category;

  // ----------------------- исходящие действия----------------------------

  @Output()
  addTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>(); // нажали на категорию из списка задач

  @Output()
  paging = new EventEmitter<PageEvent>(); // переход по страницам данных

  @Output()
  searchAction = new EventEmitter<TaskSearchValues>(); // переход по страницам данных

  @Output()
  toggleSearch = new EventEmitter<boolean>();

  // -------------------------------------------------------------------------

  tasks: Task[]; // текущий список задач для отображения
  priorities: Priority[];

  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>(); // источник данных для таблицы

  changed = false;

  sortIconName: string;

  isMobile: boolean; // мобильное ли устройство

  // параметры поиска задач - первоначально данные загружаются из cookies (в app.component)
  taskSearchValues: TaskSearchValues;

  // цвета
  readonly colorCompletedTask = '#F8F9FA';
  readonly colorWhite = '#fff';

  readonly defaultSortColumn = 'title';
  readonly defaultSortDirection = 'asc';

  // названия иконок из коллекции
  readonly iconNameDown = 'arrow_downward';
  readonly iconNameUp = 'arrow_upward';

  // значения для поиска (локальные переменные)
  filterTitle: string;
  filterCompleted: number;
  filterPriorityId: number;
  filterSortColumn: string;
  filterSortDirection: string;


  constructor(
    private dialog: MatDialog, // работа с диалоговым окном
    private deviceService: DeviceDetectorService // для определения типа устройства
  ) {
    this.isMobile = this.deviceService.isMobile();
  }


  ngOnInit() {
  }


  // передать данные таблице для отображения задач
  assignTableSource() {

    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

  }

  // диалоговое окно для добавления задачи
  openAddDialog() {



  }

  // диалоговое редактирования для добавления задачи
  openEditDialog(task: Task): void {



  }


  // диалоговое окно подтверждения удаления
  openDeleteDialog(task: Task) {

  }


  // нажали/отжали выполнение задачи
  onToggleCompleted(task: Task) {


  }


  // в зависимости от статуса задачи - вернуть цвет
  getPriorityColor(task: Task) {

    // если задача завершена - возвращаем цвет
    if (task.completed) {
      return this.colorCompletedTask;
    }

    // вернуть цвет приоритета, если он указан
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return this.colorWhite;

  }

  // в зависимости от статуса задачи - вернуть фоновый цвет
  getPriorityBgColor(task: Task) {

    if (task.priority != null && !task.completed) {
      return task.priority.color;
    }

    return 'none';
  }

// в это событие попадает как переход на другую страницу (pageIndex), так и изменение кол-ва данных на страниц (pageSize)
  pageChanged(pageEvent: PageEvent) {
    this.paging.emit(pageEvent);
  }

  // параметры поиска
  initSearch() {

    // сохраняем значения перед поиском
    this.taskSearchValues.title = this.filterTitle;
    this.taskSearchValues.completed = this.filterCompleted;
    this.taskSearchValues.priorityId = this.filterPriorityId;
    this.taskSearchValues.sortColumn = this.filterSortColumn;
    this.taskSearchValues.sortDirection = this.filterSortDirection;

    this.searchAction.emit(this.taskSearchValues);

    this.changed = false; // сбрасываем флаг изменения

  }


  // проверяет, были ли изменены какие-либо параметры поиска (по сравнению со старым значением)
  checkFilterChanged() {

    this.changed = false;

    // поочередно проверяем все фильтры (текущее введенное значение с последним сохраненным)
    if (this.taskSearchValues.title !== this.filterTitle) {
      this.changed = true;
    }

    if (this.taskSearchValues.completed !== this.filterCompleted) {
      this.changed = true;
    }

    if (this.taskSearchValues.priorityId !== this.filterPriorityId) {
      this.changed = true;
    }

    if (this.taskSearchValues.sortColumn !== this.filterSortColumn) {
      this.changed = true;
    }

    if (this.taskSearchValues.sortDirection !== this.filterSortDirection) {
      this.changed = true;
    }

    return this.changed;

  }



  // выбрать правильную иконку (убывание, возрастание)
  initSortDirectionIcon() {

    if (this.filterSortDirection === 'desc') {
      this.sortIconName = this.iconNameDown;
    } else {
      this.sortIconName = this.iconNameUp;
    }

  }


  // изменили направление сортировки
  changedSortDirection() {

    if (this.filterSortDirection === 'asc') {
      this.filterSortDirection = 'desc';
    } else {
      this.filterSortDirection = 'asc';
    }

    this.initSortDirectionIcon(); // применяем правильную иконку

  }

  // проинициализировать локальные переменные поиска
  initSearchValues() {
    if (!this.taskSearchValues) {
      return;
    }
    this.filterTitle = this.taskSearchValues.title;
    this.filterCompleted = this.taskSearchValues.completed;
    this.filterPriorityId = this.taskSearchValues.priorityId;
    this.filterSortColumn = this.taskSearchValues.sortColumn;
    this.filterSortDirection = this.taskSearchValues.sortDirection;
  }

  // сбросить локальные переменные поиска
  clearSearchValues() {
    this.filterTitle = '';
    this.filterCompleted = null;
    this.filterPriorityId = null;
    this.filterSortColumn = this.defaultSortColumn;
    this.filterSortDirection = this.defaultSortDirection;
    this.initSortDirectionIcon();
  }

  onToggleSearch(){
    this.toggleSearch.emit(!this.showSearch)
  }

}

