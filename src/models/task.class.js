import { LEVELS } from "./levels.enum";

export class Task{
    name='';
    description='';
    levels=LEVELS.NORMAL;
    state=false;
    constructor(name, description, levels, state) {
        this.name = name;
        this.description = description;
        this.levels = levels;
        this.state = state;
    }
}