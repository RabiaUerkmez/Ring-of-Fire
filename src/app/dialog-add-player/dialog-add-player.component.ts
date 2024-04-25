import { Component } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss',
})
export class DialogAddPlayerComponent {
  name: string = '';

  constructor(private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>,
  ) { }

  onNoClick() {
    this.dialogRef.close();
  }
}