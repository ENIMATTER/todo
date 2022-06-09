import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  dialogTitle: string;
  task: Task;
  tmpTitle: string;

  categories: Category[];
  tmpCategory: Category | undefined;

  priorities: Priority[];
  tmpPriority: Priority | undefined;

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.task.title;

    this.tmpCategory = this.task.category;
    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);

    this.tmpPriority = this.task.priority;
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);
  }

  onConfirm(): void{
    this.task.title = this.tmpTitle;

    this.task.category = this.tmpCategory;

    this.task.priority = this.tmpPriority;

    this.dialogRef.close(this.task);
  }

  onCancel(): void{
    this.dialogRef.close(null);
  }

  delete(): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dialogRef.close('delete');
      }
    })
  }

  complete(): void{
    this.dialogRef.close('complete');
  }

  activate(): void{
    this.dialogRef.close('activate');
  }

}
