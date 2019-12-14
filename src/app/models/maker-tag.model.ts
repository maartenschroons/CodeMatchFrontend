import { Maker } from './maker.model';
import { Tag } from './tag.model';

export class MakerTag {
    makerTagID: number;
    makerID: number;
    tagID: number
    maker: Maker;
    tag: Tag;

    constructor(makerTagID: number, maker: Maker, tag: Tag, makerID: number, tagID:number)
    {
        this.maker = maker;
        this.makerTagID = makerTagID;
        this.tag = tag;
        this.makerID = makerID;
        this.tagID = tagID;
    }
}
