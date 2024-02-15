import {FileView, ItemView, TFile, type WorkspaceLeaf} from "obsidian";

import EpubReaderComponent from "../components/EpubReader.svelte";
import store from "../store";
import type EpubReaderPlugin from "../main";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class EpubReader extends FileView {
	component!: EpubReaderComponent;


	constructor (leaf: WorkspaceLeaf, plugin: EpubReaderPlugin) {
		super (leaf);
		store.plugin.set (plugin);
	}


	async onLoadFile (file: TFile): Promise<void> {
		if (this.component) this.component.$destroy();
		this.contentEl.empty();

		const target        = this.contentEl;
		const fileContent   = await this.app.vault.readBinary (file);
		const path          = file.path;
		const props         = {fileContent};
		this.component      = new EpubReaderComponent ( {target, props} )
	}


	getViewType()       {return VIEW_TYPE_EXAMPLE;}
	getDisplayText()    {return "Example view";}
	async onUnload()    {this.component.$destroy();}

	canAcceptExtension (extension:string) :boolean{ return extension == "epub";}
}