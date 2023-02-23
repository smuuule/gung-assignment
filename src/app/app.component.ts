import {Component} from '@angular/core';
import {CategoryService, Category} from "./services/category.service";
import {first, firstValueFrom, map, Observable} from "rxjs";
import {ProductService} from "./services/product.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {

  }

  title = "gung-assignment";
  category: Category | undefined;


  getDataSource() {

    // Recursive gathering of products in sub-categories
    const get = async (x: Category) => {

      // Category IS a category (great sentence)
      // Apply "get" on all children of the category
      if (x.id.startsWith("s")) {
        x.children = await Promise.all(x.children.map(async y => await get(y)))
        return x

      // Category is a product (Base Case)
      } else {
        x.name = await firstValueFrom(this.productService.getProduct(x.id).pipe(map(r => r.name)))
        return x
      }
    }

    // Fetch categories from the CategoryService and update
    this.categoryService.getCategories().pipe().subscribe( async result => { this.category = await get(result) } )

  }

  ngOnInit() {
    this.getDataSource();
  }
}
