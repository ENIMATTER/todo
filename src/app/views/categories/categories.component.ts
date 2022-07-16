import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {OperType} from "../../dialog/OperType";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[];

  @Input()
  selectedCategory: Category;

  @Input("categoryMap")
  set setCategoryMap(categoryMap: Map<Category, number>){
    this.selectedCategoryMap = categoryMap;
  }

  @Input()
  uncompletedTotal: number;

  // выбрали категорию из списка
  @Output()
  selectCategory = new EventEmitter<Category>();

  // удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>();

  // изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>();

  // добавили категорию
  @Output()
  addCategory = new EventEmitter<string>(); // передаем только название новой категории

  // поиск категории
  @Output()
  searchCategory = new EventEmitter<string>(); // передаем строку для поиска

  // для отображения иконки редактирования при наведении на категорию
  indexMouseMove: number;
  searchCategoryTitle: string; // текущее значение для поиска категорий

  selectedCategoryMap: Map<Category, number>;

  isMobile: boolean;
  isTablet: boolean;

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog, // внедряем MatDialog, чтобы работать с диалоговыми окнами
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = deviceService.isMobile();
    this.isTablet = deviceService.isTablet();
  }

  // метод вызывается автоматически после инициализации компонента
  ngOnInit() {

  }

  showTasksByCategory(category: Category): void {

    // если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category; // сохраняем выбранную категорию

    // вызываем внешний обработчик и передаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory);
  }

  // сохраняет индекс записи категории, над которым в данный момент проходит мышка (и там отображается иконка редактирования)
  showEditIcon(index: number) {
    this.indexMouseMove = index;

  }

  // диалоговое окно для редактирования категории
  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории', OperType.EDIT],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') { // нажали удалить

        this.deleteCategory.emit(category); // вызываем внешний обработчик

        return;
      }

      if (result as string) { // нажали сохранить
        category.title = result as string;

        this.updateCategory.emit(category); // вызываем внешний обработчик
        return;
      }
    });
  }

  // диалоговое окно для добавления категории
  openAddDialog() {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Добавление категории', OperType.ADD],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string); // вызываем внешний обработчик
      }
    });
  }

  // поиск категории
  search() {
    if (this.searchCategoryTitle == null ) {
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}
