<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import {
    AccountCtrl,
    ClientCtrl,
    ConfigCtrl,
    ModalCtrl,
  } from "@web3modal/core";
  import { chains, providers } from "@web3modal/ethereum";
  import "@web3modal/ui";

  let connected, address;

  // Define constants
  const PROJECT_ID = "e8c3f6360905ea7d27c22698599cf084";

  const clientConfig = {
    projectId: PROJECT_ID,
    theme: "dark",
    accentColor: "blackWhite",
  };

  const ethereumConfig = {
    appName: "web3Modal",
    autoConnect: false,
    chains: [chains.mainnet],
    providers: [providers.walletConnectProvider({ projectId: PROJECT_ID })],
  };

  // Set up core and ethereum clients
  ConfigCtrl.setConfig(clientConfig);
  ClientCtrl.setEthereumClient(ethereumConfig);

  // Subscribe to events once client is initialized
  ClientCtrl.subscribe(({ initialized }) => {
    if (initialized) {
      AccountCtrl.watch((account) => {
        console.log("Account detected: ", account);
        if (account) {
          connected = account.isConnected;
          address = account.address;
          console.log("Logging status of detected account");
          console.log("Address: ", account.address);
          console.log("isConnected: ", account.isConnected);
        } else {
          console.log(account);
        }
      });
    }
  });

  onMount(async () => {
    if (localStorage.getItem("already_connected")) {
      await handleConnectWallet();
    }
  });

  const handleConnectWallet = async () => {
    const account = AccountCtrl.get();
    console.log("Logging status of account on button click");
    console.log("Address: ", account.address);
    console.log("isConnected: ", account.isConnected);

    ModalCtrl.open();
  };
</script>

<div
  class="min-h-screen flex flex-col justify-center items-center space-y-6"
  in:fade
>
  <img class="2-1/2" src="logo.png" alt="Logo" />
  <div class="flex justify-center">
    {#if connected}
      <button class="text-white border-2 border-primary bg-primary py-1 px-2 rounded-lg font-bold" >
        {address.substr(0, 9) + "..."}
      </button>
    {:else}
      <button
        on:click={handleConnectWallet}
        class="text-white border-2 border-primary bg-primary py-1 px-2 rounded-lg font-bold"
      >
        Connect Wallet
      </button>
    {/if}

    <w3m-modal />
  </div>
</div>

<style>
</style>
