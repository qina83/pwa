import { Guid } from 'guid-typescript';

export enum CategoryDirection {
    in = 'in',
    out = 'out'
}

// try to use it as immutable
export class Category {

    private _code: string;
    private _name: string;
    private _icon: string;
    private _direction: CategoryDirection;

    public get code(): string {
        return this._code;
    }

    public get name(): string {
        return this._name;
    }

    public get icon(): string {
        return this._icon;
    }

    public get direction(): CategoryDirection {
        return this._direction;
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

    public setDirection(value: CategoryDirection): Category {
        const cloned = this.clone();
        cloned._direction = value;
        return cloned;
    }

    private clone() {
        const cloned: Category = new Category();
        cloned._code = this.code;
        cloned._icon = this._icon;
        cloned._name = this.name;
        cloned._direction = this.direction;
        return cloned;
    }


    // tslint:disable-next-line:no-unnecessary-initializer
    constructor(category: { code: string, name: string, icon: string, direction: CategoryDirection|string } = undefined) {
        if (!category)
            this._code = Guid.create().toString();
        else {
            this._code = category.code;
            this._icon = category.icon;
            this._name = category.name;
            this._direction = <CategoryDirection>category.direction;
        }
    }
}
