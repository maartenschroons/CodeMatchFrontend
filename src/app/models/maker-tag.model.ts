import { Maker } from './maker.model';
import { Tag } from './tag.model';

export class MakerTag {
    makerTagID: number;
    maker: Maker;
    tag: Tag;

    constructor(makerTagID: number, maker: Maker, tag: Tag)
    {
        this.maker = maker;
        this.makerTagID = makerTagID;
        this.tag = tag;
    }
}
