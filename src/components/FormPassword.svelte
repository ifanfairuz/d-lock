<form class="flex flex-col gap-4" on:submit={submit}>
    <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        {#if !valid}
        <p class="text-sm text-red-400">{ err_message.password }</p>
        {/if}
        <input bind:value={password} on:input={validate} type="password" id="password" class="p-2 bg-slate-200 rounded-lg" placeholder="Type file password" autocomplete="current-password" required />
    </div>
    {#if confirmation}
    <div class="flex flex-col gap-2">
        <label for="password_confirm">Retype Password</label>
        {#if !valid}
        <p class="text-sm text-red-400">{ err_message.password_confirm }</p>
        {/if}
        <input bind:value={password_confirm} on:input={validate} type="password" id="password_confirm" class="p-2 bg-slate-200 rounded-lg" placeholder="Retype file password" autocomplete="current-password" required />
    </div>
    {/if}
    <div class="flex justify-between pt-4">
        <button type="button" on:click={close} class="py-2 px-3 rounded-lg bg-slate-200 text-slate-900">Cancel</button>
        <button type="submit" disabled={!valid} class="py-2 px-3 rounded-lg bg-slate-900 text-white disabled:bg-slate-600">{ confirmation ? 'Save' : 'Open' }</button>
    </div>
</form>

<script lang="ts">
    import { getContext } from "svelte";
    export let confirmation = false;
    export let onSubmit: (password) => void;

    let valid = false;
    let password = '';
    let password_confirm = '';
    let err_message = {
        password: '',
        password_confirm: ''
    };

    const validation = () => {
        err_message = {
            password: '',
            password_confirm: ''
        };
        if (password.length < 8) {
            err_message.password = 'Password length must be atleast 8 characters';
            return false;
        }
        if (password.length > 100) {
            err_message.password = 'Password length must be 8 to 100 characters';
            return false;
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z]).{8,100}$/)) {
            err_message.password = 'Password must contain at least one uppercase and one lowercase letter';
            return false;
        }
        if (!password.match(/^(?=.*\d).{8,100}$/)) {
            err_message.password = 'Password must contain at least one numeric digit';
            return false;
        }
        if (!password.match(/^(?=.*[!@#$%^&*]).{8,100}$/)) {
            err_message.password = 'Password must contain at least one special character !@#$%^&*';
            return false;
        }
        if (confirmation && password != password_confirm) {
            err_message.password_confirm = 'Passwords did not match';
            return false;
        }
        return true;
    }
    const validate = () => valid = validation();

    const { close } = getContext('simple-modal');
    const submit = (e: SubmitEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit(password);
    }

    $: onSubmit;
</script>