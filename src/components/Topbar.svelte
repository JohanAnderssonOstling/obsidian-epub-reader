<script>
	import { sidebarVisible } from '../store';

	function toggleSidebar() {
		sidebarVisible.update(v => !v);
	}
</script>

<div class="topbar">
    <button on:click={toggleSidebar}>Toggle Sidebar</button>
</div>

<style>
    /* TopBar styles */
</style>
