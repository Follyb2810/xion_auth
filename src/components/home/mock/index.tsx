import { LayoutDashboard, Repeat, Send, Wallet } from "lucide-react";
import { IConnectCard } from "../container/ConnectCard";

export const ConnectCardData:IConnectCard[] =[
    {
        path: 'send',
        content:'Send crypto to any wallet address quickly and securely',
        title:'Send',
        Icon:Send
    },
    {
        path: 'nft',
        content:'Browse, buy, and sell NFTs on our marketplace',
        title:'NFT',
        Icon:LayoutDashboard
    },
    {
        path: 'trade',
        content:'Trade cryptocurrencies with advanced tools and charts',
        title:'Trade',
        Icon:Wallet
    },
    {
        path: 'swap',
        content:'Swap between different tokens with competitive rates',
        title:'Swap',
        Icon:Repeat
    },
    // {
    //     path: 'ArrowRight',
    //     content:'Send crypto to any wallet address quickly and securely',
    //     title:'Send',
    //     Icon:Repeat
    // },
]