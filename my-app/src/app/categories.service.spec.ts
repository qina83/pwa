import { cold, getTestScheduler } from 'jasmine-marbles';
import { CategoriesService } from './categories.service';
import { CategoriesApiService } from './categories-api.service';
import { CategoryDTO } from './category-dto';
import { of } from 'rxjs';
import { Category, CategoryDirection } from './category';

fdescribe('CategoriesService', () => {
  let categoriesApiServiceStub: CategoriesApiService;
  let sut: CategoriesService;

  beforeEach(() => {
    categoriesApiServiceStub = <CategoriesApiService>{};
    categoriesApiServiceStub.loadCategories = () => null;
    categoriesApiServiceStub.addCategory = (category: CategoryDTO) => null;
    categoriesApiServiceStub.deleteCategoryByCode = (code: string) => null;
    categoriesApiServiceStub.modifyCategory = (category: Category) => null;

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
        name: 'name1',
        direction: 'in'
      },
      {
        code: 'code2',
        icon: 'icon2',
        name: 'name2',
        direction: 'out'
      },
    ];

    const cat1 = new Category({
      code: 'code1',
      icon: 'icon1',
      name: 'name1',
      direction: CategoryDirection.in
    });
    const cat2 = new Category({
      code: 'code2',
      icon: 'icon2',
      name: 'name2',
      direction: CategoryDirection.out
    });



    spyOn(categoriesApiServiceStub, 'loadCategories').and
      .callFake(function () { return of(dtos, scheduler); });

    scheduler.schedule(() => sut.loadCategories(), 10);

    const expected = cold('ab', { a: [], b: [cat1, cat2] });
    expect(sut.categories).toBeObservable(expected);

    // activate the scheduler so the test can properly run!
    scheduler.flush();
  });


  fit('should categories emits 2 events if addCategory is called twice', () => {
    const cat1 = new Category({
      code: 'code1',
      icon: 'icon1',
      name: 'name1',
      direction: CategoryDirection.in
    });
    const cat2 = new Category({
      code: 'code2',
      icon: 'icon2',
      name: 'name2',
      direction: CategoryDirection.out
    });

    spyOn(categoriesApiServiceStub, 'loadCategories').and
      .callFake(function () { return of([]); });

    spyOn(categoriesApiServiceStub, 'addCategory').and
      .callFake(function (category: CategoryDTO) { return of({}); });

    spyOn(sut, 'loadCategories').and.callThrough();

    sut.addCategory(cat1);
    sut.addCategory(cat2);

    expect(sut.loadCategories).toHaveBeenCalledTimes(2);

  });


  it('should categories emits 1 events if deleteCategory is called', () => {
    const scheduler = getTestScheduler();
    const cat1 = new Category({
      code: 'code1',
      icon: 'icon1',
      name: 'name1',
      direction: CategoryDirection.in
    });
    const cat2 = new Category({
      code: 'code2',
      icon: 'icon2',
      name: 'name2',
      direction: CategoryDirection.out
    });

    spyOn(categoriesApiServiceStub, 'addCategory').and
      .callFake(function (category: CategoryDTO) { return of({}); });

    spyOn(categoriesApiServiceStub, 'deleteCategoryByCode').and
      .callFake(function (code: string) { return of({}); });

    scheduler.schedule(() => sut.addCategory(cat1), 10);
    scheduler.schedule(() => sut.addCategory(cat2), 20);
    scheduler.schedule(() => sut.removeCategory(cat1.code), 30);

    // how to test only delete?
    const expected = cold('abcd', { a: [], b: [cat1], c: [cat1, cat2], d: [cat2] });

    expect(sut.categories).toBeObservable(expected);

    scheduler.flush();
  });


  it('should categories emits 1 events if substituteCategory is called', () => {
    const scheduler = getTestScheduler();
    const cat1 = new Category({
      code: 'code1',
      icon: 'icon1',
      name: 'name1',
      direction: CategoryDirection.in
    });

    const cat2 = new Category({
      code: 'code2',
      icon: 'icon2',
      name: 'name2',
      direction: CategoryDirection.out
    });

    const cat3 = new Category({
      code: 'code2',
      icon: 'icon3',
      name: 'name2',
      direction: CategoryDirection.out
    });

    spyOn(categoriesApiServiceStub, 'addCategory').and
      .callFake(function (category: CategoryDTO) { return of({}); });

    spyOn(categoriesApiServiceStub, 'modifyCategory').and
      .callFake(function (category: Category) { return of({}); });

    scheduler.schedule(() => sut.addCategory(cat1), 10);
    scheduler.schedule(() => sut.addCategory(cat2), 20);
    scheduler.schedule(() => sut.substituteCategory(cat2.setIcon('icon3')), 30);

    // how to test only delete?
    const expected = cold('abcd', { a: [], b: [cat1], c: [cat1, cat2], d: [cat1, cat3] });

    expect(sut.categories).toBeObservable(expected);

    scheduler.flush();
  });
});
