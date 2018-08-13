import { Component, Input } from '@angular/core';

/**
 * DYFI pin
 *
 * @param product
 *     dyfi product
 */
@Component({
  selector: 'executive-dyfi-pin',
  templateUrl: './dyfi-pin.component.html',
  styleUrls: ['./dyfi-pin.component.scss']
})
export class DyfiPinComponent {
  public link = '../dyfi';
  public title = 'Did You Feel It?';

  @Input()
  product: any;
}
