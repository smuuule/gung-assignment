import {Component, Input} from '@angular/core';
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],

})
export class CategoryComponent {

  constructor( public productService: ProductService ) {

  }

  @Input() category: any;

  filtered = [];


  ngOnInit() {

  }

  ngOnChanges() {
    this.filter()
  }

  async filter() {
    this.filtered = this.category.children;
  }


  isCategory(category: any) {
    return category.id.startsWith("s");
  }


}
