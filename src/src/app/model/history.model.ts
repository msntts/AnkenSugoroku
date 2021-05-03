export class HistoryModel {
    private date: string;

    // スクエアID
    private from: number;

    // スクエアID
    private to: number;

    private comment: string;

    constructor(date: string,
        from: number, to: number,
        comment: string) {
        this.date = date;
        this.from = from;
        this. to = to;
        this.comment = comment;
    }


    public get Date(): string {
        return this.date;
    }

    public get From(): number {
        return this.from;
    }

    public get To(): number {
        return this.to;
    }

    public get Comment(): string {
        return this.comment;
    }
}