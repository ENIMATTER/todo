import {Component, Inject, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Priority} from '../../model/Priority';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})

export class EditPriorityDialogComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Priority, string], // данные, которые передали в диалоговое окно
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) {
  }

  dialogTitle: string;
  priority: Priority;
  canDelete = false;

  ngOnInit() {
    this.priority = this.data[0];
    this.dialogTitle = this.data[1];

    // если было передано значение, значит это редактирование, поэтому делаем удаление возможным (иначе скрываем иконку)
    if (this.priority && this.priority.id > 0) {
      this.canDelete = true;
    }

  }

  confirm(): void {
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.priority)); // передаем обратно измененный объект
  }

  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить приоритет: "${this.priority.title}"? (задачам будет присвоено значение 'Без приоритета')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }


      if (result.action === DialogAction.OK) {
        this.dialogRef.close(new DialogResult(DialogAction.DELETE));
      }
    });

  }
}
