<div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input bind:value={password} type="password" id="password" class="p-2 bg-slate-200 rounded-lg" placeholder="Type file password" autocomplete="current-password" />
    </div>
    {#if confirmation}
    <div class="flex flex-col gap-2">
        <label for="password_confirm">Retype Password</label>
        <input bind:value={password_confirm} type="password" id="password_confirm" class="p-2 bg-slate-200 rounded-lg" placeholder="Retype file password" autocomplete="current-password" />
    </div>
    {/if}
    <div class="flex justify-between pt-4">
        <button type="button" on:click={close} class="py-2 px-3 rounded-lg bg-slate-200 text-slate-900">Close</button>
        <button type="button" on:click={onSubmit} disabled={!((!confirmation || (confirmation && password_confirm != '')) && password != '')} class="py-2 px-3 rounded-lg bg-slate-900 text-white disabled:bg-slate-600">Save</button>
    </div>
</div>

<script lang="ts">
    import { getContext } from "svelte";
    export let confirmation = false;
    export let onSubmit = () => {};

    let password = '';
    let password_confirm = '';

    const { close } = getContext('simple-modal');

    $: onSubmit;
</script>