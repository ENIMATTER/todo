import { Component } from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Task} from "./model/Task";
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'ToDo';
  tasks: Task[];
  categories: Category[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void{
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

}
