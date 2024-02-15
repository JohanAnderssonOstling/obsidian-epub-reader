<script lang="ts">
import TocItem from './TocItem.svelte';
    import {sidebarVisible} from "../store"
    import type {NavItem} from "epubjs";
	import {onMount} from "svelte";
export let onClick: (href: string) => void;
export let toc: Array<NavItem> = [];
</script>


<div class="sidebar" class:visible={$sidebarVisible}>
    <ul>
        {#each toc as item}
            <TocItem {item} onClick = {onClick} />
        {/each}
    </ul>
</div>


<style>
    .sidebar {
        width: 200px;
        background-color: #eee;
        padding: 20px;
        box-shadow: 3px 0px 5px rgba(0,0,0,0.2);
        display: none;
    }

    .sidebar.visible {
        display: block;
    }
</style>