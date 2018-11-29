import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FriendService} from '../../../services/friend.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-friend-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // confirmPassword: string;
  confirmPassword = new FormControl();

  growlMessages: Message[] = [];

  friendForm: FormGroup;

  constructor(private friendService: FriendService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.friendForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      cellphone: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.friendForm = new FormGroup({
    //   name: new FormControl(''),
    //   surname: new FormControl(),
    //   cellphone: new FormControl(),
    //   username: new FormControl(),
    //   password: new FormControl(),
    // });
  }

  register(): void {
    if (this.friendForm.get('password').value !== this.confirmPassword.value) {
      this.growlMessages.push({summary: 'Passwords do not match.', severity: 'danger'});
    } else {
      const friend = this.friendForm.value;
      this.friendService.save(friend, {responseType: 'text'}).subscribe((resp) => {
        this.growlMessages.push({summary: 'User Created.', severity: 'success'});
        this.router.navigateByUrl('/login');
      }, error => {
        console.log('Error:', error);
        this.growlMessages.push({summary: 'Something went wrong.', severity: 'danger'});
      });
    }
  }

}
