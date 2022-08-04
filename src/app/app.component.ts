import {Component, OnInit} from '@angular/core';
import {Category} from './model/Category';
import {Task} from './model/Task';
import {IntroService} from './service/intro.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Priority} from './model/Priority';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {CategorySearchValues, TaskSearchValues} from "./data/dao/search/SearchObjects";
import {Stat} from "./model/Stat";
import {TaskService} from "./data/dao/impl/TaskService";
import {CategoryService} from "./data/dao/impl/CategoryService";
import {PriorityService} from "./data/dao/impl/PriorityService";
import {StatService} from "./data/dao/impl/StatService";
import {DashboardData} from "./object/DashboardData";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  selectedCategory: Category = null;

  isMobile: boolean;
  isTablet: boolean;

  showStat = true;
  showSearch = true;

  tasks: Task[];
  priorities: Priority[];
  categories: Category[];

  stat: Stat;
  dash: DashboardData = new DashboardData();

  menuOpened: boolean;
  menuMode: any;
  menuPosition: any;
  showBackdrop: boolean;

  uncompletedCountForCategoryAll: number;

  totalTasksFounded: number;

  taskSearchValues = new TaskSearchValues();
  categorySearchValues = new CategorySearchValues();

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private priorityService: PriorityService,
    private statService: StatService,
    private dialog: MatDialog,
    private introService: IntroService,
    private deviceService: DeviceDetectorService
  ) {

    this.statService.getOverallStat().subscribe((result => {
      this.stat = result;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;

      this.fillAllCategories().subscribe(res => {
        this.categories = res;

        this.selectCategory(this.selectedCategory);

      });
    }));

    this.isMobile = deviceService.isMobile();
    this.isTablet = deviceService.isTablet();

    this.setMenuDisplayParams();

  }

  ngOnInit(): void {

    this.fillAllPriorities();

    if (!this.isMobile && !this.isTablet) {
      this.introService.startIntroJS(true);
    }
  }

  fillAllPriorities() {

    this.priorityService.findAll().subscribe(result => {
      this.priorities = result;
    });
  }

  fillAllCategories(): Observable<Category[]> {

    return this.categoryService.findAll();

  }

  fillDashData(completedCount: number, uncompletedCount: number) {
    this.dash.completedTotal = completedCount;
    this.dash.uncompletedTotal = uncompletedCount;
  }

  selectCategory(category: Category) {

    if (category) {
      this.fillDashData(category.completedCount, category.uncompletedCount);
    } else {
      this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal);
    }

    this.taskSearchValues.pageNumber = 0;

    this.selectedCategory = category;

    this.taskSearchValues.categoryId = category ? category.id : null;

    this.searchTasks(this.taskSearchValues);

    if (this.isMobile) {
      this.menuOpened = false;
    }
  }

  addCategory(category: Category) {
    this.categoryService.add(category).subscribe(() => {
        this.searchCategory(this.categorySearchValues);
      }
    );
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(() => {
      this.selectedCategory = null; // выбираем категорию "Все"

      this.searchCategory(this.categorySearchValues);
      this.selectCategory(this.selectedCategory);

    });
  }

  updateCategory(category: Category) {
    this.categoryService.update(category).subscribe(() => {

      this.searchCategory(this.categorySearchValues);
      this.searchTasks(this.taskSearchValues);

    });
  }

  searchCategory(categorySearchValues: CategorySearchValues) {

    this.categoryService.findCategories(categorySearchValues).subscribe(result => {
      this.categories = result;
    });

  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }

  toggleSearch(showSearch: boolean) {
    this.showSearch = showSearch;
  }

  searchTasks(searchTaskValues: TaskSearchValues) {

    this.taskSearchValues = searchTaskValues;

    this.taskService.findTasks(this.taskSearchValues).subscribe(result => {

      if (result.totalPages > 0 && this.taskSearchValues.pageNumber >= result.totalPages) {
        this.taskSearchValues.pageNumber = 0;
        this.searchTasks(this.taskSearchValues);
      }

      this.totalTasksFounded = result.totalElements;
      this.tasks = result.content;
    });

  }

  updateOverallCounter() {

    this.statService.getOverallStat().subscribe((res => {
      this.stat = res;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;

      if (!this.selectedCategory) {
        this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal);
      }

    }));

  }

  updateCategoryCounter(category: Category) {

    this.categoryService.findById(category.id).subscribe(cat => {

      this.categories[this.getCategoryIndex(category)] = cat;

      this.showCategoryDashboard(cat);

    });
  }

  showCategoryDashboard(cat: Category) {
    if (this.selectedCategory && this.selectedCategory.id === cat.id) {
      this.fillDashData(cat.completedCount, cat.uncompletedCount);
    }
  }

  addTask(task: Task) {

    this.taskService.add(task).subscribe(() => {

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }
      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);

    });

  }

  deleteTask(task: Task) {

    this.taskService.delete(task.id).subscribe(() => {

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }

      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);

    });
  }

  updateTask(task: Task) {

    this.taskService.update(task).subscribe(() => {

      if (task.oldCategory) {
        this.updateCategoryCounter(task.oldCategory);
      }

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }

      this.updateOverallCounter();

      this.searchTasks(this.taskSearchValues);

    });

  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  onClosedMenu() {
    this.menuOpened = false;
  }

  setMenuDisplayParams() {
    this.menuPosition = 'left'; // меню слева

    if (this.isMobile) {
      this.menuOpened = false;
      this.menuMode = 'over';
      this.showBackdrop = true;
    } else {
      this.menuOpened = true;
      this.menuMode = 'push';
      this.showBackdrop = false;
    }

  }

  paging(pageEvent: PageEvent) {

    if (this.taskSearchValues.pageSize !== pageEvent.pageSize) {
      this.taskSearchValues.pageNumber = 0;
    } else {

      this.taskSearchValues.pageNumber = pageEvent.pageIndex;
    }

    this.taskSearchValues.pageSize = pageEvent.pageSize;
    this.taskSearchValues.pageNumber = pageEvent.pageIndex;

    this.searchTasks(this.taskSearchValues);
  }

  settingsChanged(priorities: Priority[]){
    this.priorities = priorities;
    this.searchTasks(this.taskSearchValues);
  }

  getCategoryFromArray(id: number): Category {
    return this.categories.find(t => t.id === id);
  }

  getCategoryIndex(category: Category): number {
    const tmpCategory = this.categories.find(t => t.id === category.id);
    return this.categories.indexOf(tmpCategory);
  }

}


