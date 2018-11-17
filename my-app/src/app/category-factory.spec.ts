import { cold, getTestScheduler } from 'jasmine-marbles';
import { CategoryDTO } from './category-dto';
import { Category, CategoryDirection } from './category';
import { CategoryFactory } from './category-factory';



fdescribe('CategoryFactory', () => {

  beforeEach(() => {
  });

  it('should crete Category from DTO with direction in', () => {
    const dto =
    {
      code: 'code1',
      icon: 'icon1',
      name: 'name1',
      direction: 'in'
    };

    const cat: Category = CategoryFactory.DTOToCategoy(dto);
    expect(cat.code).toEqual('code1');
    expect(cat.icon).toEqual('icon1');
    expect(cat.name).toEqual('name1');
    expect(cat.direction).toEqual(CategoryDirection.in);
  });

  it('should crete Category from DTO with direction out', () => {
    const dto =
    {
      code: 'code1',
      icon: 'icon1',
      name: 'name1',
      direction: 'out'
    };

    const cat: Category = CategoryFactory.DTOToCategoy(dto);
    expect(cat.code).toEqual('code1');
    expect(cat.icon).toEqual('icon1');
    expect(cat.name).toEqual('name1');
    expect(cat.direction).toEqual(CategoryDirection.out);
  });

  it('should crete DTO from Category with direction in', () => {
    const cat: Category = new Category({
      code: 'code1',
      icon: 'icon1',
      name: 'name1',
      direction: 'in'
    });

    const dto = CategoryFactory.CategoryToDTO(cat);

    expect(dto.code).toEqual('code1');
    expect(dto.icon).toEqual('icon1');
    expect(dto.name).toEqual('name1');
    expect(dto.direction).toEqual(CategoryDirection.in);
  });


  it('should crete DTO from Category with direction out', () => {
    const cat: Category = new Category({
      code: 'code1',
      icon: 'icon1',
      name: 'name1',
      direction: 'out'
    });

    const dto = CategoryFactory.CategoryToDTO(cat);

    expect(dto.code).toEqual('code1');
    expect(dto.icon).toEqual('icon1');
    expect(dto.name).toEqual('name1');
    expect(dto.direction).toEqual(CategoryDirection.out);
  });



});
