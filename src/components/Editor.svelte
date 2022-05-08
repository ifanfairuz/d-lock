<!-- svelte-ignore a11y-autofocus -->
<textarea
    class="w-full h-full p-4 text-2xl bg-transparent outline-none resize-none placeholder:text-slate-400"
    placeholder="Type your secret in here..."
    autofocus
    bind:this={textarea}
    bind:value={value}
></textarea>

<script lang="ts">
    export let value = '';
    export let textarea: HTMLTextAreaElement = null;
    
    export const focus = () => textarea.focus();
</script>