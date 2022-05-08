<main>
	<div class="container mx-auto p-4 pb-10 h-screen flex flex-col gap-4">
		<!-- heading -->
		<div class="py-4 md:py-10 text-center">
			<h1 class="text-4xl">Welcome to <span>D-Lock</span></h1>
			<p class="text-secondary">Lock your password and secret</p>
		</div>
		<!-- content -->
		<div class="flex-1">
			<div class="mx-auto max-w-4xl h-full">
				<!-- toolbar -->
				<div class="flex justify-between">
					<input type="file" bind:this={fileInput} on:change={onOpenFile} class="hidden">
					<div class="flex divide-x">
						<button type="button" on:click={onOpen} class="px-4 py-2 flex gap-2 items-center disabled:text-slate-400">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
								<path d="M2.165 19.551c.186.28.499.449.835.449h15c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 11h-1V7c0-1.103-.897-2-2-2h-6.1L9.616 3.213A.997.997 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14h.007a1 1 0 0 0 .158.551zM17.341 18H4.517l2.143-5h12.824l-2.143 5zM18 7v4H6c-.4 0-.762.238-.919.606L4 14.129V7h14z"></path>
							</svg>
							Open
						</button>
						<Modal show={$modal} closeButton={false} closeOnOuterClick={false}>
							<button type="button" on:click={onSave} disabled={text == ''} class="px-4 py-2 flex gap-2 items-center disabled:text-slate-400">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
									<path d="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"></path>
								</svg>
								Save
							</button>
						</Modal>
					</div>
					<div class="flex divide-x">
						<button type="button" on:click={onClear} disabled={text == ''} class="px-4 py-2 flex gap-2 items-center disabled:text-slate-400">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
								<path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"></path>
								<path d="M15.292 7.295 12 10.587 8.708 7.295 7.294 8.709l3.292 3.292-3.292 3.292 1.414 1.414L12 13.415l3.292 3.292 1.414-1.414-3.292-3.292 3.292-3.292z"></path>
							</svg>
							Clear
						</button>
					</div>
				</div>
				<!-- end of toolbar -->
				<hr>
				<!-- editor -->
				<Editor bind:value={text} />
				<!-- end of editor -->
			</div>
		</div>
		<!-- end of content -->
	</div>
</main>

<script lang="ts">
	import { writable } from 'svelte/store';
	import Modal, { bind } from 'svelte-simple-modal';
	import Editor from "@components/Editor.svelte";
	import FormPassword from "@components/FormPassword.svelte";
	import { decrypt, encrypt } from '@module/encryption';
	import { exportFile, processFile } from '@module/file';

	const modal = writable(null);

	let fileInput: HTMLInputElement;
	let text = '';

	const onSubmit = (password) => {
		const result = encrypt(text, password);
		exportFile(result);
		text = '';
		modal.set(null);
	}
	const onOpened = async (password) => {
		if (fileInput.files.length < 1) return;
		const cipher = await processFile(fileInput.files[0]);
		const result = decrypt(cipher, password);
		if (result) {
			text = result;
			modal.set(null);
			fileInput.value = '';
		} else alert('Password invalid.');
	}

	const onClear = () => window.location.reload();
	const onOpen = () => fileInput.click();
	const onSave = () => {
		modal.set(bind(FormPassword, { onSubmit, confirmation: true }));
	}
	const onOpenFile = () => {
		modal.set(bind(FormPassword, { onSubmit: onOpened }));
	}
</script>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	body {
		@apply bg-slate-900;
		@apply text-white;
	}
	.text-secondary {
		@apply text-slate-400;
	}
</style>