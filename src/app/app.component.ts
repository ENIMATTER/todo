import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Task} from './model/Task';
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  title = 'Todo';
  tasks: Task[];
  categories: Category[];

  selectedCategory: Category;

  constructor(
    private dataHandler: DataHandlerService, // фасад для работы с данными
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

    // @ts-ignore
    this.onSelectCategory(null); // показать все задачи

  }

  // изменение категории
  onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.dataHandler.searchTasks(
      this.selectedCategory,
      // @ts-ignore
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // обновление задачи
  onUpdateTask(task: Task) {

    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        // @ts-ignore
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  // удаление задачи
  onDeleteTask(task: Task) {

    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        // @ts-ignore
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  // удаление категории
  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      // @ts-ignore
      this.selectedCategory = undefined; // открываем категорию "Все"
      this.onSelectCategory(this.selectedCategory);
    });
  }

  // обновлении категории
  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }
}
