import { Component } from '@angular/core';
import { User } from '../../enum/user-information.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public user = User;
}
