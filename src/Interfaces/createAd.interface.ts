export interface AdCategories{
    id:number,
    title:string,
    subCategoies?:Array<AdCategories>
}
