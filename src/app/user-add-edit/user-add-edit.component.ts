import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit{
userForm: FormGroup;

education: string[] = [
  'Intermediate',
  'Diploma',
  'Graduate',
  'Post Graduate'
];

constructor(
  private _fb: FormBuilder, 
  private _userService: UsersService, 
  private  _dialogRef: MatDialogRef<UserAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private _coreService: CoreService,
  ){
  this.userForm = this._fb.group({
    firstName: '',
    lastName: '',
    email: '',
    dob:'',
    gender:'',
    education: '',
    company:'',
    designation: '',
    experience:'',
  })
}

ngOnInit(): void {
  this.userForm.patchValue(this.data);
}

onFormSubmit(){
  if(this.userForm.valid){
    if(this.data){
      this._userService.updateUsers(this.data.id,this.userForm.value).subscribe({
        next:(val: any) => {
          alert('');
          this._coreService.openSnackBar('Users detail updated!','done');
          this._dialogRef.close(true);
        },
        error:(err: any)=>{
          console.error(err);
        },
      });
    }else{
      this._userService.addUsers(this.userForm.value).subscribe({
        next:(val: any) => {
          alert('');
          this._coreService.openSnackBar('Users added successfully!','done');

          this._dialogRef.close(true);
        },
        error:(err: any)=>{
          console.error(err);
        },
      });
    }
  }
}
}
