import { Component, Directive, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Empty shell to serve as a base for any mixin.
 */
export class Base {}

export function WithDisabled<TBase extends Constructor<Base>>(Clazz: TBase) {
  @Directive()
  class WithDisabled extends Clazz {
    isDisabled = model(false, { alias: 'disabled' });
  }
  return WithDisabled;
}

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: `
    <div class="row">
      <div>Disabled: {{ isDisabled() }}</div>
    </div>
  `,
})
export class ChildComponent extends WithDisabled(Base) {}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <!-- <app-child></app-child> -->
    <!-- DO NOT WORK -->
    <app-child [disabled]="shouldDisable"></app-child>
    <div class="row space-top">
      <button type="button" (click)="shouldDisable = false">Disable</button>
      <button type="button" (click)="shouldDisable = true">Enable</button>
    </div>
  `,
})
export class ParentComponent {
  shouldDisable = false;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'inheritance';
}
