<script lang="ts">
	import type {NavItem} from "epubjs";
	import TocItem from "./TocItem.svelte";
	export let item: NavItem;
	export let onClick: (href: string) => void; // Passed down click handler

	function handleClick() {
		onClick(item.href); // Pass the item's href and the event
	}
</script>

<li>
    <a href="javascript:void(0)" on:click={handleClick}>
        {item.label}
    </a>
    {#if item.subitems && item.subitems.length > 0}
        <ul>
            {#each item.subitems as subitem}
                <TocItem item={subitem} onClick={onClick} />
            {/each}
        </ul>
    {/if}
</li>
