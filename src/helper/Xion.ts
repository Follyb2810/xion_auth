import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  GasPrice,
  SigningStargateClient,
  StargateClient,
  Coin,
  QueryClient,
  setupAuthExtension,
  setupAuthzExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { xionToUxion } from "./convert";

export class XionTransaction {
  private readonly XION_RPC_URL = "https://rpc.xion-testnet-2.burnt.com";
  private readonly CHAIN_ID = "xion-testnet-2";

  async getStargateClient() {
    return StargateClient.connect(this.XION_RPC_URL);
  }

  async getQueryCosmWasmClient(): Promise<CosmWasmClient> {
    return CosmWasmClient.connect(this.XION_RPC_URL);
  }

  async getSigningWasmClient(mnemonic?: string): Promise<SigningCosmWasmClient> {
    if (!mnemonic) throw new Error("Mnemonic is required");

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: "xion",
    });

    return SigningCosmWasmClient.connectWithSigner(this.XION_RPC_URL, wallet, {
      gasPrice: GasPrice.fromString("0.05uxion"),
    });
  }

  async baseQueryClient(): Promise<QueryClient & ReturnType<typeof setupAuthExtension>> {
    const tmClient = await Tendermint34Client.connect(this.XION_RPC_URL);
    return QueryClient.withExtensions(tmClient, setupAuthExtension);
  }

  async getAllTokenBalances(address: string) {
    const client = await this.getStargateClient();
    return client.getAllBalances(address);
  }

  async getSigningStargateClient(mnemonic?: string): Promise<SigningStargateClient> {
    if (!mnemonic) throw new Error("Mnemonic is required");

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: "xion",
    });

    return SigningStargateClient.connectWithSigner(this.XION_RPC_URL, wallet, {
      gasPrice: GasPrice.fromString("0.025uxion"),
    });
  }

  async transferFund(
    mnemonic: string,
    recipientAddress: string,
    amount: Coin[],
    memo = ""
  ): Promise<string> {
    const client = await this.getSigningStargateClient(mnemonic);
    const account = await client.getAccount('');
    // const [account] = await client.getAccounts();
    const senderAddress = account?.address;
    console.log({account})
    // const [account] = await (await client.getAccounts())[0];
    // const senderAddress = account.address;

    const result = await client.sendTokens(senderAddress!, recipientAddress, amount, "auto", memo);
    await client.disconnect();
    return result.transactionHash;
  }

  async getChainId() {
    const client = await this.getStargateClient();
    return client.getChainId();
  }

  async getIbcDenomTrace(ibcHash: string): Promise<string | null> {
    try {
      const res = await fetch(`https://api.xion-testnet-2.burnt.com/ibc/apps/transfer/v1/denom_traces/${ibcHash}`);
      const data = await res.json();
      return data?.denom_trace?.base_denom ?? null;
    } catch (err) {
      console.error("Failed to fetch IBC denom trace:", err);
      return null;
    }
  }

  async getAllTokenBalancesWithDenoms(address: string) {
    const balances = await this.getAllTokenBalances(address);

    const resolvedBalances = await Promise.all(
      balances.map(async (bal) => {
        let denom = bal.denom;

        if (denom.startsWith("ibc/")) {
          const hash = denom.split("/")[1];
          const resolved = await this.getIbcDenomTrace(hash);
          denom = resolved?.toUpperCase() || denom;
        } else if (denom.startsWith("u")) {
          denom = denom.slice(1).toUpperCase();
        } else {
          denom = denom.toUpperCase();
        }

        return {
          denom,
          amount: bal.amount,
        };
      })
    );

    return resolvedBalances;
  }

  async getAuthzQueryClient() {
    const tmClient = await Tendermint34Client.connect(this.XION_RPC_URL);
    return QueryClient.withExtensions(tmClient, setupAuthzExtension);
  }

  async signTransaction(
    mnemonic: string,
    fromAddress: string,
    toAddress: string,
    amount: string,
    denom = "uxion"
  ) {
    const client = await this.getSigningStargateClient(mnemonic);

    const msg = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress,
        toAddress,
        amount: [{ denom, amount: xionToUxion(amount) }],
      },
    };

    const fee = {
      amount: [{ denom, amount: xionToUxion("0.025") }],
      gas: "200000",
    };

    const memo = "Sample of sign and broadcast";

    return client.signAndBroadcast(fromAddress, [msg], fee, memo);
  }

  async Proposal(
    mnemonic: string,
    proposer: string,
    title: string,
    amount: string,
    description: string,
    denom = "uxion"
  ) {
    const client = await this.getSigningStargateClient(mnemonic);

    const msg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: {
        content: {
          typeUrl: "/cosmos.gov.v1beta1.TextProposal",
          value: {
            title,
            description,
          },
        },
        proposer,
        initialDeposit: [{ denom, amount: xionToUxion(amount) }],
      },
    };

    const fee = {
      amount: [{ denom, amount: xionToUxion("0.025") }],
      gas: "200000",
    };

    const memo = "Submit proposal";

    return client.signAndBroadcast(proposer, [msg], fee, memo);
  }

  async grantAuthorization(
    mnemonic: string,
    granter: string,
    grantee: string,
    amount: string,
    denom = "uxion"
  ) {
    const client = await this.getSigningStargateClient(mnemonic);

    const msg = {
      typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
      value: {
        granter,
        grantee,
        grant: {
          authorization: {
            typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
            value: {
              spendLimit: [{ denom, amount: xionToUxion(amount) }],
            },
          },
          expiration: {
            seconds: Math.floor(Date.now() / 1000) + 86400, // 1 day
            nanos: 0,
          },
        },
      },
    };

    const fee = {
      amount: [{ denom, amount: xionToUxion("0.025") }],
      gas: "200000",
    };

    const memo = "Grant authorization";

    return client.signAndBroadcast(granter, [msg], fee, memo);
  }

  async revokeAuthorization(
    mnemonic: string,
    granter: string,
    grantee: string
  ) {
    const client = await this.getSigningStargateClient(mnemonic);

    const msg = {
      typeUrl: "/cosmos.authz.v1beta1.MsgRevoke",
      value: {
        granter,
        grantee,
        msgTypeUrl: "/cosmos.bank.v1beta1.MsgSend",
      },
    };

    const fee = {
      amount: [{ denom: "uxion", amount: xionToUxion("0.025") }],
      gas: "200000",
    };

    const memo = "Revoke authorization";

    return client.signAndBroadcast(granter, [msg], fee, memo);
  }
}



// const xionTx = new XionTransaction();

// const mnemonic = "your-mnemonic-here";
// const recipient = "xion1recipientaddresshere";
// const amount = [{ denom: "uxion", amount: "1000000" }]; // 1 XION
// const memo = "Token transfer test";

// try {
//   const txHash = await xionTx.transferFund(mnemonic, recipient, amount, memo);
//   console.log("Transaction successful, hash:", txHash);
// } catch (error) {
//   console.error("Transaction failed:", error);
// }