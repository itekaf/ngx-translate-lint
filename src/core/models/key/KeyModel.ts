class KeyModel {
    public name: string;
    public value: string | null;

    public localesList: string[] = [];
    public templatesList: string[] = [];

    constructor(name: string, templatesList: string[] = [], localesList: string[] = [], value: string | null = null) {
        this.name = name;
        this.value = value;

        this.localesList = localesList;
        this.templatesList = templatesList;
    }
}

export { KeyModel };
