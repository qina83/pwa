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
    categoriesApiServiceStub.addCategory = (category: CategoryDTO) => null;

    sut = new CategoriesService(categoriesApiServiceStub);
  });

  it('should categories be empty array and not null after creation', () => {
    const scheduler = getTestScheduler();
    const expected = cold('a', { a: [] });
    expect(sut.categories).toBeObservable(expected);
    scheduler.flush();
  });

  it('should categories emits array with cat1 and cat2 after loadCategories() called', () => {
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

    const cat1 = new Category({
      code: 'code1',
      icon: 'icon1',
      name: 'name1'
    });
    const cat2 = new Category({
      code: 'code2',
      icon: 'icon2',
      name: 'name2'
    });



    spyOn(categoriesApiServiceStub, 'loadCategories').and
      .callFake(function () { return of(dtos, scheduler); });

    scheduler.schedule(() => sut.loadCategories(), 10);

    const expected = cold('ab', { a: [], b: [cat1, cat2] });
    expect(sut.categories).toBeObservable(expected);

    // activate the scheduler so the test can properly run!
    scheduler.flush();
  });


  it('should categories emits 2 events if addCategory is called twice', () => {
    const scheduler = getTestScheduler();
    const cat1 = new Category({
      code: 'code1',
      icon: 'icon1',
      name: 'name1'
    });
    const cat2 = new Category({
      code: 'code2',
      icon: 'icon2',
      name: 'name2'
    });

    spyOn(categoriesApiServiceStub, 'addCategory').and
      .callFake(function (category: CategoryDTO) { return of({}); });

    scheduler.schedule(() => sut.addCategory(cat1), 10);
    scheduler.schedule(() => sut.addCategory(cat2), 20);

    const expected = cold('abc', { a: [],  b: [cat1], c: [cat1, cat2]});
    expect(sut.categories).toBeObservable(expected);

    // activate the scheduler so the test can properly run!
    scheduler.flush();
  });
});
