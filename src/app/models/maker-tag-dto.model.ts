export class MakerTagDTO {
    makerTagID: number;
    makerID: number;
    tagID: number;
    
    constructor(makerTagID: number, makerID: number, tagID: number) {
        this.makerTagID = makerTagID;
        this.makerID = makerID;
        this.tagID = tagID;
    }
}