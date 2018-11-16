import { Guid } from 'guid-typescript';
import { CategoryDTO } from './category-dto';
import { Optional } from '@angular/core';

interface Update {
    name: string;
    value?: string;
}

// try to use it as immutable
export class Category {

    private _code: string;
    private _name: string;
    private _icon: string;


    public get code(): string {
        return this._code;
    }

    public get name(): string {
        return this._name;
    }

    public setName(value: string): Category {
        const cloned = this.clone();
        cloned._name = value;
        return cloned;
    }

    public setIcon(value: string): Category {
        const cloned = this.clone();
        cloned._icon = value;
        return cloned;
    }

    private clone() {
        const cloned: Category = new Category();
        cloned._code = this.code;
        cloned._icon = this._icon;
        cloned._name = this.name;
        return cloned;
    }


    // tslint:disable-next-line:no-unnecessary-initializer
    constructor(category: { code: string, name: string, icon: string } = undefined) {
        if (!category)
            this._code = Guid.create().toString();
        else {
            this._code = category.code;
            this._icon = category.icon;
            this._name = category.name;
        }
    }

    public mapFromDTO(dto: CategoryDTO): Category {
        const category: Category = new Category();
        category._code = dto.code;
        category._icon = dto.icon;
        category._name = dto.name;
        return category;
    }

    public mapToDTO(): CategoryDTO {
        return {
            code: this._code,
            icon: this._icon,
            name: this._name
        };
    }
}
