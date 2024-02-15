<script lang="ts">
	import {onMount} from "svelte";
	export let path: string;

	//import {View} from '../foliate-js/view.js'
    //import {EPUB} from "../foliate-js/epub.js";
    //import {makeZipLoader} from "../foliate-js/reader.js";



    //onMount(loadBook);

    /*async function loadBook() {
        const loader = await makeZipLoader(path);
        const epub = await new EPUB(loader).init();
        const view = document.createElement('foliate-view') as View;
        document.body.append(view);
        await view.open(epub);

    }*/

</script>