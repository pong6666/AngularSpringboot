import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.employeeForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      let employee: Employee = new Employee();
      if (this.employeeForm.get('firstName') && this.employeeForm.get('lastName')) {
        employee.firstName = this.employeeForm.get('firstName')!.value;
        employee.lastName = this.employeeForm.get('lastName')!.value;
      }
      this.employeeService.createEmployee(employee).subscribe(data => {
        console.log(data);
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '300px',
          position: { top: '10%', left: '40%' },
          data: { message: 'Submission successful!' }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.closeDialog(dialogRef);
        });
      },
        error => console.log(error));
    }
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    this.saveEmployee();
  }

  closeDialog(dialogRef: MatDialogRef<SuccessDialogComponent>) {
    console.log('Closing dialog...');
    dialogRef.close();
    this.goToEmployeeList();
  }


}

@Component({
  selector: 'app-success-dialog',
  template: `
    <h2 mat-dialog-title></h2>
    <div mat-dialog-content style="text-align: center;">
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions style="display: flex; justify-content: center;">
      <button mat-button (click)="closeDialog()" style="margin: 0 auto;">Close</button>
    </div>
  `
})
export class SuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }, private router: Router, private dialogRef: MatDialogRef<SuccessDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/employees']);
  }
}