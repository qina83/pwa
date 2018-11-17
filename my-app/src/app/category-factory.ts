import { Category } from './category';
import { CategoryDTO } from './category-dto';

export class CategoryFactory {
    public static DTOToCategoy(dto: CategoryDTO): Category {
        return new Category(dto);
    }

    public static CategoryToDTO(category: Category): CategoryDTO {
         return {
            code: category.code,
            icon: category.icon,
            name: category.name,
            direction: category.direction
        };
    }
}

