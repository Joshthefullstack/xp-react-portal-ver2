export class XPCrudType {
    static Add = new XPCrudType("Add");
    static Update = new XPCrudType("Update")
    static Delete = new XPCrudType("Delete")
    static Search = new XPCrudType("Search")

    constructor(name){
        this.name = name;
    }

    static byType(type){
        switch(type){
            case XPCrudType.Add: 
                return `${this.Add.name}`;
            case XPCrudType.Update:
                return `${this.Update.name}`;
            case XPCrudType.Delete:
                return `${this.Delete.name}`;
            case XPCrudType.Search:
                return `${this.Search.name}`
            default:
                return "";
        }
    }
}