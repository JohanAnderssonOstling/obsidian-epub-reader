<script lang="ts">
import ePub, {Book, type NavItem, Rendition, type Location} from 'epubjs';
	import type {TocItem} from "../types";
	import {onMount} from "svelte";
	import store from "../store";
	import EpubReaderPlugin from "../main";
	import {TFile, TFolder, type Vault} from "obsidian";
	import {v4 as uuidv4} from 'uuid';

export let fileContent  :ArrayBuffer;
export let toc          :Array<NavItem>;

let plugin      :EpubReaderPlugin
let vault       :Vault;
store.plugin.subscribe((p) => (plugin = p));

let rendition   :Rendition;
let identifier  :string;
let filePath    :string;

let divuuid     =   uuidv4();

onMount(() => {
    vault           =   plugin.app.vault;
    const book      =   ePub(fileContent);
	const load      =   book.loaded;
    load.navigation .then((navigation)  => {toc = navigation.toc});
    load.metadata   .then((metadata)    => {
        identifier      =   metadata.identifier.replaceAll  (/[:\/\\]| /g, '')
        filePath        =   "epubplugin/${identifier}.txt";
        rendition       =   book.renderTo   (divuuid,   {width:"100%",  height:"100%"});
        vault.read      (getCfiFile()).then((cfi)           =>  {rendition.display(cfi);});
        rendition.on    ("relocated", (location: Location)  =>  {vault.modify(getCfiFile(), location.start.cfi);});
	    rendition.on    ("rendered" , handleRendered);      });     });


function handleRendered (e: Event, iframe: any) {
    iframe.document .addEventListener    ("keydown", (e: KeyboardEvent) => {
        if              (e.key == "ArrowRight")     rendition.next();
        else if         (e.key == "ArrowLeft")      rendition.prev();});
    iframe?.iframe?.contentWindow.focus();}


function getCfiFile() : TFile {
    let file        =   vault.getAbstractFileByPath (filePath);
    if              (file instanceof TFile)         return file;
    vault.create    (filePath, "").then((file)  => {return file;});
    return          getCfiFile();   }


export function gotoCfi     (cfi: string)   {rendition.display(cfi);}
</script>


<body>
<div id={divuuid}></div>
</body>


<style>
div {
    width: 100%;    height: 100%;
    background: lightyellow;
}
</style>