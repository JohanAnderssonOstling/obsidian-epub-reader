import EpubReaderPlugin from "./main";
import { writable } from "svelte/store";

const plugin = writable<EpubReaderPlugin>();
export default { plugin };

export const sidebarVisible = writable<boolean>(false);