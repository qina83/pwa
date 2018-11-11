import { Guid } from 'guid-typescript';
import { CategoryDTO } from './category-dto';

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

    public set name(value: string) {
        this._name = value;
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(value: string) {
        this._icon = value;
    }

    constructor() {
        this._code = Guid.create().toString();
    }

    public mapFromDTO(dto: CategoryDTO) {
        this._code = dto.code;
        this._icon = dto.icon;
        this.name = dto.name;
    }

    public mapToDTO(): CategoryDTO {
        return {
            code: this._code,
            icon: this._icon,
            name: this._name
        };
    }


}
