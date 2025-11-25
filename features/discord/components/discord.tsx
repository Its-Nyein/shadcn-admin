import {
  Cog,
  Gift,
  Headphones,
  HelpCircle,
  Inbox,
  Menu,
  Mic,
  Phone,
  Pin,
  PlusCircle,
  Search,
  Smile,
  Sticker,
  UserCircle,
  Video,
} from "lucide-react";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { Icons } from "./icons";

const MockDiscordUI = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] bg-discord-background overflow-hidden shadow-lg text-white rounded-lg">
      {/* server list */}
      <div className="hidden md:flex w-[72px] bg-[#202225] py-3 flex-col items-center">
        <div className="size-12 bg-discord-brand-color rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200">
          <Icons.discord className="size-3/5 text-white" />
        </div>

        <div className="w-8 h-[2px] rounded-full bg-discord-background my-2" />

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="size-12 rounded-3xl bg-discord-background flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-discord-brand-color cursor-not-allowed"
          >
            <span className="text-lg text-gray-400 font-semibold">
              {String.fromCharCode(65 + i)}
            </span>
          </div>
        ))}

        <div className="group mt-auto size-12 rounded-3xl bg-discord-background flex items-center justify-center hover:rounded-xl transition-all duration-200 hover:bg-[#3ba55c] cursor-not-allowed">
          <PlusCircle className="text-[#3ba55c] group-hover:text-white" />
        </div>
      </div>

      {/* dm list */}
      <div className="hidden md:flex flex-col bg-[#2f3136]">
        <div className="px-4 h-16 border-b border-[#202225] flex items-center shadow-sm">
          <div className="w-full h-8 bg-[#202225] text-sm rounded flex items-center justify-center px-2 text-gray-500 cursor-not-allowed">
            Find or start a conversation
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-4">
          <div className="px-2 mb-4">
            <div className="flex text-sm px-2 py-1.5 items-center hover:bg-[#393c43] text-[#dcddde] cursor-not-allowed">
              <UserCircle className="mr-4 size-8 text-[#b9bbbe]" />
              <span className="text-sm font-medium">Friends</span>
            </div>
            <div className="flex text-sm px-2 py-1.5 items-center hover:bg-[#393c43] text-[#dcddde] cursor-not-allowed">
              <Inbox className="mr-4 size-8 text-[#b9bbbe]" />
              <span className="text-sm font-medium">Nitro</span>
            </div>
          </div>

          <div className="px-2 mb-4">
            <h3 className="text-xs font-semibold text-[#8e9297] px-2 mb-2 uppercase">
              Direct Messages
            </h3>
            <div className="flex items-center px-2 py-1.5 rounded-md bg-[#393c43] text-white cursor-pointer">
              <Image
                src="https://github.com/shadcn.png"
                width={32}
                height={32}
                alt="Shadcn Admin avatar"
                className="object-cover rounded-full mr-3"
              />
              <span className="font-medium">Shadcn Admin</span>
            </div>

            <div className="my-1 space-y-px">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center px-2 py-1.5 rounded text-gray-600 cursor-not-allowed"
                >
                  <div className="size-8 rounded-full bg-discord-background mr-3" />
                  <span className="font-medium">User {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-2 bg-[#292b2f] flex items-center">
          <Image
            src="https://github.com/shadcn.png"
            width={32}
            height={32}
            alt="Shadcn Admin avatar"
            className="rounded-full mr-2"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Shadcn Admin</p>
            <p className="text-xs text-[#b9bbbe] flex items-center">
              @shadcn_admin
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Mic className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer" />
            <Headphones className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer" />
            <Cog className="size-5 text-[#b9bbbe] hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* main content here */}
      <div className="flex-1 flex flex-col">
        {/* dm list */}
        <div className="h-16 bg-[#36393f] flex items-center px-4 shadow-sm border-b border-[#202225]">
          <div className="md:hidden mr-4">
            <Menu className="size-6 text-[#b9bbbe] hover:text-white cursor-pointer" />
          </div>

          <div className="flex items-center">
            <div className="relative">
              <Image
                src="https://github.com/shadcn.png"
                alt="Shadcn Admin avatar"
                width={40}
                height={40}
                className="object-cover rounded-full mr-3"
              />
              <div className="absolute bottom-0 right-3 size-3 bg-green-500 rounded-full border-2 border-[#36393f]" />
            </div>
            <p className="font-semibold text-white">Shadcn Admin</p>
          </div>

          <div className="ml-auto flex items-center space-x-2 lg:space-x-4 text-[#b9bbbe]">
            <Phone className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
            <Video className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
            <Pin className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
            <UserCircle className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
            <Search className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
            <Inbox className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
            <HelpCircle className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
          </div>
        </div>

        {/* message his */}
        <div className="flex-1 overflow-y-auto p-4 bg-discord-background flex flex-col-reverse">
          {children}
        </div>

        {/* message input */}
        <div className="p-4">
          <div className="flex items-center bg-[#40444b] rounded-lg p-1">
            <PlusCircle className="mx-3 text-[#b9bbbe] hover:text-white cursor-not-allowed" />
            <input
              type="text"
              placeholder="Message @Shadcn Admin"
              readOnly
              className="flex-1 bg-transparent py-2 px-1 text-white placeholder-[#72767d] focus:outline-none cursor-not-allowed"
            />
            <div className="flex items-center space-x-3 text-[#b9bbbe]">
              <Gift className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
              <Sticker className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
              <Smile className="size-5 hover:text-white cursor-not-allowed hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockDiscordUI;
