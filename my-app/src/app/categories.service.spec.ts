import { cold, getTestScheduler } from 'jasmine-marbles';
import { CategoriesService } from './categories.service';
import { CategoriesApiService } from './categories-api.service';
import { ErrorsService } from './errors.service';
import { CategoryDTO } from './category-dto';
import { of } from 'rxjs';
import { Category, CategoryDirection } from './category';

describe('CategoriesService', () => {
  let categoriesApiServiceStub: CategoriesApiService;
  let errorServiceStub: ErrorsService;
  let sut: CategoriesService;

  beforeEach(() => {
    categoriesApiServiceStub = <CategoriesApiService>{};
    categoriesApiServiceStub.loadCategories = () => null;
    categoriesApiServiceStub.addCategory = (category: CategoryDTO) => null;
    categoriesApiServiceStub.deleteCategoryByCode = (code: string) => null;
    categoriesApiServiceStub.modifyCategory = (category: Category) => null;

    errorServiceStub = <ErrorsService>{};
    errorServiceStub.sendError = (errorMessage: string) => null;

    sut = new CategoriesService(categoriesApiServiceStub, errorServiceStub);
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


  it('should addCategory call loadCategories', (done) => {
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

    sut.addCategory(cat1).then(() => {
      expect(sut.loadCategories).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should removeCategory call loadCategories', (done) => {
    spyOn(categoriesApiServiceStub, 'loadCategories').and
      .callFake(function () { return of([]); });

    spyOn(categoriesApiServiceStub, 'deleteCategoryByCode').and
      .callFake(function (code: string) { return of({}); });

    spyOn(sut, 'loadCategories').and.callThrough();

    sut.removeCategory('code1').then(() => {
      expect(sut.loadCategories).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
