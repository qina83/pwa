import { cold, getTestScheduler } from 'jasmine-marbles';
import { CategoriesService } from './categories.service';
import { CategoriesApiService } from './categories-api.service';
import { CategoryDTO } from './category-dto';
import { of } from 'rxjs';
import { Category } from './category';

fdescribe('CategoriesService', () => {
  let categoriesApiServiceStub: CategoriesApiService;
  let sut: CategoriesService;

  beforeEach(() => {
    categoriesApiServiceStub = <CategoriesApiService>{};
    categoriesApiServiceStub.loadCategories = () => null;

    sut = new CategoriesService(categoriesApiServiceStub);
  });

  it('should categories be empty array and not null after creation', () => {
    const scheduler = getTestScheduler();
    const expected = cold('a', { a: [] });
    expect(sut.categories).toBeObservable(expected);
    scheduler.flush();
  });

  it('should categories be fill by Category objects after loadCategories', () => {
    const scheduler = getTestScheduler();
    const dtos: CategoryDTO[] = [
      {
        code: 'code1',
        icon: 'icon1',
        name: 'name1'
      },
      {
        code: 'code2',
        icon: 'icon2',
        name: 'name2'
      },
    ];

    const cat1 = new Category();
    const cat2 = new Category();
    cat1.mapFromDTO(dtos[0]);
    cat2.mapFromDTO(dtos[1]);

    spyOn(categoriesApiServiceStub, 'loadCategories').and
      .callFake(function () { return of(dtos, scheduler); });

     scheduler.schedule(() => sut.loadCategories(), 10);

    const expected = cold('ab', { a: [], b: [cat1, cat2] });
    expect(sut.categories).toBeObservable(expected);

    // activate the scheduler so the test can properly run!
    scheduler.flush();
  });
});
