import { Page } from "@playwright/test";
import { Response } from "@playwright/test";
import { GotoOptions, BasicWait } from "../utils/global.types";
import  {Header } from "../sections/header.components";


export class CommonPage {
    protected readonly _page: Page;

    // Components
    private header?: Header;


    public constructor(_page: Page) {
        this._page = _page;
    }

    public async goto(url: string, options: GotoOptions): Promise<Response | null> {
        return this._page.goto(url, options);
    }

    public async waitForLoadStage(option: BasicWait = 'domcontentloaded'): Promise<void> {
        await this._page.waitForLoadState(option);
    }


    public async url(): Promise<string> {
        return this._page.url();
    }

    public getHeader(): Header {
        if (!this.header) {
            this.header = new Header(this._page);
        }
        return this.header;
    }

}