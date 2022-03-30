import { Component } from '@angular/core';
import { LoadingState, Person } from './if-loaded.directive';

@Component({
  selector: 'angular-structural-directive-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  state: LoadingState<Person> = {
    type: 'loading',
  };

  constructor() {
    setTimeout(() => {
      this.state = {
        type: 'loaded',
        data: {
          name: 'Nam',
        },
      };
    }, 5000);
  }
}
