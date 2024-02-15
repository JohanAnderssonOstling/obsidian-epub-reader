import {Plugin, WorkspaceLeaf, Vault} from "obsidian";
import { EpubReader, VIEW_TYPE_EXAMPLE } from "./views/epubReader";
import "virtual:uno.css";

interface ObsidianNoteConnectionsSettings { mySetting: string;}

const DEFAULT_SETTINGS: ObsidianNoteConnectionsSettings = { mySetting: "default",};

export default class EpubReaderPlugin extends Plugin {
	settings!: ObsidianNoteConnectionsSettings;


	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() { await this.saveData(this.settings);}


	async onload() {
		await this.loadSettings();
		this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new EpubReader(leaf, this));
		this.registerExtensions(["epub"], VIEW_TYPE_EXAMPLE);
	}

	onunload() {}
}