import "server-only";

import React from "react";
import { cookies } from "next/headers";
import { SITE_USER_COOKIE } from "@/configs/constants";
import { ChatGPTApp } from "@/components/chatgpt/ChatGPTApp";
import * as UserAPI from "@/api/user";
import { Container } from "@/components/ChakraUI";

export default async function ChatGPTPage() {
  const hashedKey = cookies().get(SITE_USER_COOKIE)?.value as string;

  let isLogin: boolean;
  try {
    isLogin = await UserAPI.isLoggedIn(hashedKey);
  } catch (e) {
    console.error(e);
    isLogin = false;
  }

  return (
    <Container marginTop='60px' minW='8xl' p={{ md: "2rem", base: "1rem" }}>
      <div className='bg-[#343541] flex h-[85vh] overflow-y-auto rounded-md items-center justify-center'>
        <ChatGPTApp loggedIn={isLogin} />
      </div>
    </Container>
  );
}
