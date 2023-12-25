<script lang="ts">
  import { onMount } from 'svelte';
  import Board from './components/board/board.svelte';
  import GameUI from './components/game-ui/game-ui.svelte';
  import Logo from './components/logo/logo.svelte';
  import MediaQuery from './utils/MediaQuery.svelte';

  async function loadImage(index: number, urlHolder: string[]) {
    const res = await fetch(
      `/build/src/app/assets/images/cards/obj_${index < 10 ? '0' + index : index}.png`
    );
    const cardImage = res.url;
    urlHolder.push(cardImage);
    if (urlHolder.length === 16) {
      cardIcons = temp.sort(() => Math.random() - 0.5);
    }
    console.warn('temp', urlHolder);
  }

  let cardIcons: string[] = [];
  let temp: string[] = [];

  onMount(async () => {
    for (let i = 1; i <= 16; ++i) {
      loadImage(i, temp);
    }
    return () => console.warn('called onDestroy');
  });

  /* Reactivity
   * let count = 2;
   * $: doubled = count * 2;
   *
   * $: console.log('the count is ' + count);
   *
   * $: {
   * 	console.log('the count is ' + count);
   * 	alert('I SAID THE COUNT IS ' + count);
   * }
   *
   * $: if (count >= 10) {
   *   alert('count is dangerously high!');
   *   count = 9;
   * }
   *
   */

  /* Svelte's reactivity is triggered by assignments.
   *
   * 	Methods that mutate arrays or objects will not trigger updates by themselves.
   * 	You could also write this more concisely using the ES6 spread syntax:
   *
   * 	function addNumber() {
   * 		numbers = [...numbers, numbers.length + 1];
   * 	}
   */

  /* The same rule applies to array methods such as pop, shift,
   * and splice and to objects methods such as Map.set, Set.add, etc.
   * Assignments to properties of arrays and objects — e.g.
   * obj.foo += 1 or array[i] = x — work the same way as assignments to the values themselves.
   *
   * 	function addNumber() {
   * 		numbers[numbers.length] = numbers.length + 1;
   * 	}
   */

  /* However, indirect assignments to references such as this...
   *	 const foo = obj.foo;
   *	 foo.bar = 'baz';
   *	 OR
   *	 function quox(thing) {
   *	 		thing.foo.bar = 'baz';
   *	 }
   *	 quox(obj);
   */

  /* In Svelte, we do that with the export to declare props
   *
   * 		<Nested answer={42}/> in parent
   *
   *		export let answer; // recieved in child
   *		export let answer = 'a mystery'; // default value of child
   */

  /* To conditionally render some markup, we wrap it in an if block:
   *
   *	{#if user.loggedIn}
   *		<button on:click={toggle}>
   *			Log out
   *		</button>
   *	{/if}
   *
   *	{#if !user.loggedIn}
   *		<button on:click={toggle}>
   *			Log in
   *		</button>
   *	{/if}
   *
   */

  /* To simplify this component slightly by using an else block:
   *
   *	{#if user.loggedIn}
   *		<button on:click={toggle}>
   *			Log out
   *		</button>
   *	{:else}
   *		<button on:click={toggle}>
   *			Log in
   *		</button>
   *	{/if}
   *
   * 	A # character always indicates a block opening tag.
   * 	A / character always indicates a block closing tag.
   * 	A : character, as in {:else}, indicates a block continuation tag.
   *
   */

  /* If you need to loop over lists of data, use an each block:
   * 	<ul>
   * 		{#each cats as cat, index}
   * 			<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}" rel="noreferrer">
   * 				{index + 1}: {cat.name}
   * 			</a></li>
   * 		{/each}
   *	</ul>
   *
   * If you prefer, you can use destructuring
   * — each cats as { id, name }
   * — and replace cat.id and cat.name with id and name.
   *
   */

  /* Keying. We can also using (thing) instead of (thing.id)
   *	{#each things as thing (thing.id)}
   * 		<Thing name={thing.name}/>
   * 	{/each}
   *
   */

  /* Svelte makes it easy to await the value of promises directly in your markup:
   *	{#await promise}
   * 		<p>...waiting</p>
   * 	{:then number}
   * 		<p>The number is {number}</p>
   * 	{:catch error}
   * 		<p style="color: red">{error.message}</p>
   * 	{/await}
   */

  /* You can also declare event handlers inline:
   * Unlinke React there won't be any performance issues when event handlers are inlined
   *
   *	<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
   *		The mouse position is {m.x} x {m.y}
   * 	</div>
   *
   */

  /* Event Handler Modifiers
   *
   * 	<button on:click|once={handleClick}>
   *		Click me
   *	</button>
   *
   * preventDefault — calls event.preventDefault() before running the handler. Useful for client-side form handling, for example.
   * stopPropagation — calls event.stopPropagation(), preventing the event reaching the next element
   * passive — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)
   * nonpassive — explicitly set passive: false
   * capture — fires the handler during the capture phase instead of the bubbling phase (MDN docs)
   * once — remove the handler after the first time it runs
   * self — only trigger handler if event.target is the element itself
   * trusted — only trigger handler if event.isTrusted is true. I.e. if the event is triggered by a user action.
   * You can chain modifiers together, e.g. on:click|once|capture={...}.
   *
   */

  /* Event Dispatcher
   *
   * createEventDispatcher must be called when the component is first instantiated
   * — you can't do it later inside e.g. a setTimeout callback.
   * This links dispatch to the component instance.
   *
   * 	---------------------Child-----------------------
   *	import { createEventDispatcher } from 'svelte';
   *
   *	const dispatch = createEventDispatcher();
   *
   *	function sayHello() {
   *		dispatch('message', {
   *			text: 'Hello!'
   *		});
   *	}
   *
   *	<button on:click={sayHello}>
   *		Click to say hello
   *	</button>
   *
   * 	------------------Parent-----------------
   * 	function handleMessage(event) {
   *		alert(event.detail.text);
   *	}
   *
   *	<Inner on:message={handleMessage}/>
   *
   * You can also try changing the event name to something else.
   * For instance, change dispatch('message') to dispatch('myevent') in Inner.svelte
   * and change the attribute name from on:message to on:myevent in the App.svelte component.
   *
   */

  /* Binding component or element
   *	<canvas
   *		bind:this={canvas}
   *		width={32}
   *		height={32}
   *	></canvas>
   * Note that the value of canvas will be undefined until the component has mounted, so we put the logic inside the onMount
   */

  /* Unlike DOM events, component events don't bubble.
   * If you want to listen to an event on some deeply nested component,
   * the intermediate components must forward the event.
   *
   * an on:message event directive without a value means 'forward all message events'.
   * <Inner on:message/>
   */

  /* Event forwarding works for DOM events too.
   *
   *	-----------------CHILD---------------------
   * 	<button on:click>
   *		Click me
   *	</button>
   *
   *
   * ------------------PARENT------------------
   *	<CustomButton on:click={handleClick}/>
   */

  /* onMount which runs after the component is first rendered to the DOM.
   * It's recommended to put the fetch in onMount rather than at the top level of the <script>
   * because of server-side rendering (SSR). With the exception of onDestroy, lifecycle functions don't run during SSR,
   * which means we can avoid fetching data that should be loaded lazily once the component has been mounted in the DOM.
   *
   * 	onMount(async () => {
   *		const res = await fetch(`/tutorial/api/album`);
   *		photos = await res.json();
   *		return () => console.warn('called on destroy')
   *	});
   *	If the onMount callback returns a function, that function will be called when the component is destroyed.
   *
   * 	let counter = 0;
   *	const interval = setInterval(() => counter += 1, 1000);
   *	onDestroy(() => clearInterval(interval));
   *
   */

  /*	While it's important to call lifecycle functions during the component's initialisation,
   *	it doesn't matter where you call them from.
   *	export function onInterval(callback, milliseconds) {
   *		const interval = setInterval(callback, milliseconds);
   *		onDestroy(() => {
   *			clearInterval(interval);
   *		});
   *	}
   *
   *	import { onInterval } from './utils.js';
   *	let counter = 0;
   *	onInterval(() => counter += 1, 1000);
   */

  /*	The beforeUpdate function schedules work to happen immediately before the DOM is updated.
   *	afterUpdate is its counterpart, used for running code once the DOM is in sync with your data.
   *
   * 	beforeUpdate(() => {
   *		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
   *	});
   *
   *	afterUpdate(() => {
   *		if (autoscroll) div.scrollTo(0, div.scrollHeight);
   *	});
   *
   */

  /*	The tick function is unlike other lifecycle functions in that you can call it any time, not just when the component first initialises.
   *	It returns a promise that resolves as soon as any pending state changes have been applied to the DOM
   *	(or immediately, if there are no pending state changes).
   *
   * 	beforeUpdate(() => {
   *		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
   *	});
   *
   *	afterUpdate(() => {
   *		if (autoscroll) div.scrollTo(0, div.scrollHeight);
   *	});
   *
   */
</script>

<MediaQuery
  query="(min-width: 961px), (min-width: 481px) and (max-width: 640px)"
  let:matches
>
  {#if matches && cardIcons.length > 0}
    <div id="app-root">
      <Logo />
      <Board {cardIcons} />
      <GameUI />
    </div>
  {/if}
</MediaQuery>

<MediaQuery query="(min-width: 640px) and (max-width: 960px)" let:matches>
  {#if matches && cardIcons.length > 0}
    <div id="app-root">
      <div class="mobile">
        <Logo />
        <GameUI />
      </div>
      <Board {cardIcons} />
    </div>
  {/if}
</MediaQuery>

<MediaQuery query="(max-width: 480px)" let:matches>
  {#if matches && cardIcons.length > 0}
    <div id="app-root">
      <GameUI />
      <Board {cardIcons} />
      <Logo />
    </div>
  {/if}
</MediaQuery>

<style lang="scss">
  #app-root {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Nunito';

    @media screen and (min-width: 640px) and (max-width: 960px) {
      flex-direction: column;
      align-items: center;

      .mobile {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 540px;
      }
    }

    @media screen and (max-width: 480px) {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
