import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();
  phrase: string = "";
  columnKey: string = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onDelete(user: User): void {
    let resp = confirm ("Nyomja meg az OK gombot a törléshez.")
    if (resp == true) {
      this.userService.remove(user).subscribe(
        () => {
          this.users$ = this.userService.getAll();
        }
      );
    }
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
  }
}
