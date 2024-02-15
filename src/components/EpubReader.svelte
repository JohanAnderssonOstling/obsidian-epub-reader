<body>
<Topbar/>

<div class="container">
    <Sidebar {toc} onClick = {handleItemClick} bind:this = {sidebar} />
    <EpubJSView bind:this = {epubview} bind:toc {fileContent}/>
</div>
</body>

<script lang="ts">
    import EpubJSView from "./EpubJSView.svelte";
    import Sidebar from "./Sidebar.svelte";
	import Topbar from "./Topbar.svelte";
    import type {TocItem} from "../types";
    import type {NavItem} from "epubjs";

	export let fileContent: ArrayBuffer;

	let toc: Array<NavItem>;
	let sidebar: Sidebar;
	let epubview: EpubJSView;

    function handleItemClick(href: string) {
        epubview.gotoCfi(href);
    }


</script>


<style>
    .container {
        display: flex;
        flex-wrap: nowrap;
        height: 100vh;
    }
</style>